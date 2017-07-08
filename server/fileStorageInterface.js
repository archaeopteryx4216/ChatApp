"use strict";

const fs = require('fs');

function makeKeyFromClients(clients) {
  return clients.sort().join("_");
}

function Conversation(clients) {
  let cnv = Object.create(Conversation.prototype);
  if (!clients) {
    console.log("Must provide a list of clients to build a conversation!");
    return null;
  }
  cnv.filename = makeKeyFromClients(clients)+".cnv";
  cnv.hasUpdates = false;
  cnv.updateCount = 0;
  return cnv;
}

Conversation.prototype = {
  // Place a single update at the end of the file.
  putUpdate: function(text) {
    this.hasUpdates = true;
    this.updateCount++;
    let dataString = "";
    fs.readFile(this.filename, function(err, data) {
      if (err) {
        throw err;
      }
      dataString = data.toString();
      dataString += text;
    });
    fs.writeFile(this.filename, dataString, function(err) {
      if (err) {
        throw err;
      }
    });
  },
  // Get a list of all updates.
  getUpdates: function() {
    this.hasUpdates = false;
    let count = this.updateCount;
    this.updateCount = 0;
    let messages_to_send = [];
    fs.readFile(this.filename, function(err, data) {
      if (err) {
        throw err;
      }
      let dataString = data.toString();
      let messages = dataString.split(/\r?\n/);
      messages_to_send = messages.slice(-1*count);
    });
    return messages_to_send;
  },
  // Get a full history of the messages.
  getAllMessages: function() {
    this.hasUpdates = false;
    this.updateCount = 0;
    let messages = [];
    fs.readFile(this.filename, function(err, data) {
      if (err) {
        throw err;
      }
      let dataString = data.toString();
      messages = dataString.split(/\r?\n/);
    });
    return messages;
  },
}

function FileStorageInterface() {
  let storageInterface = Object.create(FileStorageInterface.prototype);
  let conversations = {};
  return storageInterface;
}

FileStorageInterface.prototype = {
  requestNewMessages: function(clients) {
    let key = makeKeyFromClients(clients);
    if (! key in this.conversations) {
      this.conversations[key] = new Conversation(clients);
    }
    return this.conversations[key].getUpdates();
  },
  postMessage: function(clients, message) {
    let key = makeKeyFromClients(clients);
    if (! key in this.conversations) {
      this.conversations[key] = new Conversation(clients);
    }
    this.conversations[key].putUpdate(message);
  },
}

'use strict';

let logged_in_users = {};

const
  net = require('net'),
  EventEmitter = require('events'),
  DataStore = require('./dataStore').DataStore,
  dataStore = DataStore('file'),
  eventEmitter = new EventEmitter(),
  server = net.createServer(function(connection) {
    
    logged_in_users[connection] = 'anon';

    connection.on('data', function(data) {
      let message = JSON.parse(data.toString());
      if (message.type === "MSG") { // Send an ordinary message
        dataStore.postMessage(message.clients, logged_in_users[connection], message.text);
      }
      else if (message.type === "REG") { // Register a new username:password
      }
      else if (message.type === "LOG") { // Login as username:password
      }
    });

    connection.on('timesignal', function() {
      let messages = dataStore.requestNewMessages();
      for (message in messages) {
        if (logged_in_users[connection] in message.clients) {
          connection.write(JSON.stringify(message));
        }
      }
    });

  });

setInterval(function() {
  eventEmitter.emit('timesignal');
},200);

server.listen(5432, function() {
  console.log("Listening for subscribers...");
});

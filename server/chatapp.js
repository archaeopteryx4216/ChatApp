'use strict';
const
  net = require('net'),
  DataStore = require('./dataStore.js').DataStore,
  dataStore = DataStore('file'),
  server = net.createServer(function(connection) {
    
    connection.on('', function() {
    });

  });

server.listen(5432, function() {
  console.log("Listening for subscribers...");
});

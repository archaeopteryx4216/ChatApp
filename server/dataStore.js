"use strict";

exports.DataStore = function(mode) {
  let storageInterface = null;
  if (mode === "file") {
    storageInterface = require('fileStorageInterface');
  }
  else if (mode === "db") {
    storageInterface = require('dbStorageInterface');
  }
  return (storageInterface != null) ? storageInterface.store : null;
}

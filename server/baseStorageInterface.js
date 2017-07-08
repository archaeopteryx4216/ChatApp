"use strict";

function unimplimentedMethod() {
  return function() {
    console.log("Method ."+this.name+"() is unimplimented.");
  }
}

function BaseStorageInterface() {
  let storageInterface = Object.create(BaseStorageInterface.prototype);
  return storageInterface;
}

BaseInterStorgeface.prototype {
  requestNewMessages: unimplimentedMethod(),
  postMessage: unimplimentedMethod,
}

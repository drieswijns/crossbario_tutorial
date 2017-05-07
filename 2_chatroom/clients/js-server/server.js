"use strict"

const autobahn = require('autobahn');

const config = {
  authid: "admin",
  ticket: "supersecret"
};

const connection = new autobahn.Connection(
  {
    url: 'ws://localhost:8080/ws',
    realm: 'crossbar-chat',
    authmethods: ["ticket"],
    authid: config.authid,
    onchallenge: (session, method, extra) => {
      console.log("Authenticating");
      if(method !== "ticket"){
        console.warn("Authentication method not recognized.");
        return;
      }
      return config.ticket;
    }
  }
);

connection.onclose = (reason, details) => {
  console.warn(`Connection closed: ${reason}`);
};

connection.onopen = (session) => {
  console.log("Connection opened");

  session.register(
    'com.crossbar-chat.new-message',
    (args, kwargs) => {
      const nickname = kwargs.nickname;
      const message = kwargs.message;

      // profanity check
      const clean_message = message.replace("MQTT", "****");

      // publish clean message to topic com.crossbar-chat.messages
      session.publish(
        'com.crossbar-chat.messages',
        [],
        {
          nickname: nickname,
          message: clean_message
        }
      );
    }
  );
};

connection.open();

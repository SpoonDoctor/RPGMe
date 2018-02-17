"use strict";
/*Routing for our server over in app.js*/
const express = require("express");
const router = express.Router();
/*Make requests to appshare with our bot*/
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/*Handler for the commands that come in*/
const commandHandler = require("./../commandHandler");
/*Setting up a current host to whoever talks first. Only going to let one game
run at a time, at least to start. Will have to consider how this plays into
multiplayer if that evet happens*/
let currentHost = null;

/*Makes it easier and less cluttered to make our requests*/
function sendToGroupme(groupmeMessageContent)
{
  var Request = new XMLHttpRequest();
  /*Post to the groupme bot api address. Maybe should stick this in a config file*/
  Request.open("POST", "https://api.groupme.com/v3/bots/post", false);
  /*Let GroupMe know it's getting json data*/
  Request.setRequestHeader("Content-Type", "application/json");
  /*Gotta use strings, apparently*/
  Request.send(JSON.stringify(groupmeMessageContent));
}

/*Set up our route to receive requests*/
router.post("/", function(req, res)
{

  /*If the command sender is not a user, ignore the command*/
  if (req.body.sender_type === "user")
  {
    /*Do we have no current host? Is the person who just spoke not a bot?
  Guess what, they're our host now*/
    if (!currentHost)
    {
      currentHost = req.body.sender_id;
    }

    // console.log(currentHost);
// console.log(req.body);
    /*Let GroupMe know we got a response. Not sure it's necessary.*/
    res.status(200).send();
    /*Pull the text out of the request. Might be better off sending the whole object, but we'll see*/
    // let text = req.body.text;
    /*Have our commandHandler parse our request text for commands*/
    commandHandler.performCommand(req)
      .then((groupmePostContent) =>
      {
        /*Once the command is performed, then send whatever text we're sending back to GroupMe*/
        sendToGroupme(groupmePostContent);
      });
  }

});

module.exports = router;
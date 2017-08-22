"use strict";
const express = require("express");
const router = express.Router();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const commandHandler = require("./../commandHandler");

function sendToGroupme(groupmeMessageContent)
{
  var Request = new XMLHttpRequest();
  Request.open("POST", "https://api.groupme.com/v3/bots/post", false);
  Request.setRequestHeader("Content-Type", "application/json");
  Request.send(JSON.stringify(groupmeMessageContent));
}

router.post("/", function(req, res)
{
  res.status(200).send();
  let text = req.body.text;
  commandHandler.performCommand(text)
    .then((groupmePostContent) =>
    {
      sendToGroupme(groupmePostContent);
    });
});

module.exports = router;
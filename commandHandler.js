const regexCommands = require("./regexCommands");
const fs = require("fs");

let gameStateList = {
  "notBegun": 0,
  "playInProgress": 1
};

let gameState = gameStateList.notBegun;

class CommandHandler
{
  performCommand(receivedCommand)
  {
    return new Promise((resolve) =>
    {
      var groupmeMessageContent = {
        "bot_id": "9c4a022eb3c5b28b6c2072ca10",
        "text": ""
      };
      if (regexCommands.helpCommand.test(receivedCommand))
      {
        var botText = fs.readFileSync("./documents/help", "utf8");
        groupmeMessageContent.text = botText;
        resolve(groupmeMessageContent);

      }
      else if (regexCommands.beginCommand.test(receivedCommand))
      {
        groupmeMessageContent.text = "beginning";
        resolve(groupmeMessageContent);
      }
    });

  }
}

module.exports = new CommandHandler();
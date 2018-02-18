"use strict";
/*Nice way to store all our regex. Maybe we should just use json instead? Is that possible?*/
const regexCommands = require("./regexCommands");
/*To read files*/
const fs = require("fs");
/*Handles loading saved variables and creating new saves*/
const saveHandler = require("./saveHandler");

// Used to determine the games state and whether or not certain commands should be accessible.
// Can this be moved to the main GroupMe Handler? Should it be its own module?
let gameStateList = {
    "notBegun": "0",
    "creatingHeroName": "1",
    "creatingHeroClass": "1.1",
    "doneCreating": "1.2"
};


let creatingHero = false;

class CommandHandler {
    createHero(heroParam) {
        console.log("in creating hero", saveHandler.getGameState());
        if (saveHandler.getGameState() === gameStateList.creatingHeroName) {
            saveHandler.setGameState("1.1");
            //saveHandler.updateSave("name", heroParam);
            return "Your hero shall be named: " + heroParam + ". What class is " + heroParam + "?";
        } else if (saveHandler.getGameState() === gameStateList.creatingHeroClass) {
            saveHandler.setGameState("1.2");
            //saveHandler.updateSave("class", heroParam);
            return "I do say, your hero has become a(n): " + heroParam + ".";
        }
    }

    performCommand(request) {
        let receivedCommand = request.body.text;
        return new Promise((resolve) => {
            /*Content needed to post to a GroupMe chat. Maybe stick the id in a config instead of hard code?*/
            var groupmeMessageContent = {
                "bot_id": "9c4a022eb3c5b28b6c2072ca10",
                "text": ""
            };

            //debug commands
            if (regexCommands.printActiveCommand.test(receivedCommand)) {
                console.log("saveHandler AS: ", saveHandler.getActiveSave());
                groupmeMessageContent.text = "Debug active saves";
                resolve(groupmeMessageContent);
                return;
            }



            if (regexCommands.loadCommand.test(receivedCommand)) {
                saveHandler.loadSave(request.body.user_id);
                // activeSave = saveHandler.getActiveSave();
                if (saveHandler.getActiveSave() === undefined) {
                    groupmeMessageContent.text = "Failed to load file. To begin a game, use 'rpgm begin.'";
                    resolve(groupmeMessageContent);
                } else {
                    groupmeMessageContent.text = "loaded";
                    resolve(groupmeMessageContent);
                }

            } else if (regexCommands.saveCommand.test(receivedCommand)) {
                if (saveHandler.gameSave() === 0) {
                    groupmeMessageContent.text = "Failed to save. No active save.";
                    resolve(groupmeMessageContent);
                } else {
                    groupmeMessageContent.text = "Saving Game";
                    resolve(groupmeMessageContent);
                }
            } else if (creatingHero) {
                console.log("creating hero?");
                groupmeMessageContent.text = this.createHero(request.body.text);
                resolve(groupmeMessageContent);
            }
            /*Help command*/
            else if (regexCommands.helpCommand.test(receivedCommand)) {
                /*Read contents from help document and send them back to our main handler*/
                var botText = fs.readFileSync("./documents/help", "utf8");
                groupmeMessageContent.text = botText;
                resolve(groupmeMessageContent);

            }
            /*Begin command for when user has not created a character/game?*/
            else if (regexCommands.beginCommand.test(receivedCommand)) {
                console.log("In begin command");
                /*Check if the saveID is set on the save handler. If not, set it*/
                if (!saveHandler.saveIDIsSet()) {
                    console.log("In ID check");
                    //saveHandler.setSaveID(request.body.sender_id);
                    console.log(request.body.sender_id);
                    saveHandler.createSave(request.body.sender_id);
                }
                console.log("outside id check");
                /*Game state isn't 0? This command is no longer useful. Let the user know*/
                if (saveHandler.getGameState() !== gameStateList.notBegun) {
                    console.log("Game state not 0");
                    groupmeMessageContent.text = "The game can not begin as it is either already in progress or your id can not be determined.";
                    resolve(groupmeMessageContent);
                } else
                /*Game state is 0? Move to hero creation mode. Fix this because it'll always run if state is not 0*/
                {
                    console.log("Game state 0");
                    groupmeMessageContent.text = "Please enter your desired name for your hero:";
                    creatingHero = true;
                    saveHandler.setGameState("1");
                    resolve(groupmeMessageContent);
                }
            }
        });

    }
}

module.exports = new CommandHandler();
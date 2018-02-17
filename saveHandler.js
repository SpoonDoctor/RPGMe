"use strict";
const fs = require("fs");
let activeSave = null;
let saveID = null;

/*Class for handling saved data/saving data*/
class SaveHandler {
    /*Returns true if saveID is set*/
    saveIDIsSet() {
        if (saveID) {
            return true;
        } else {
            return false;
        }
    }

    /*Sets the saveID to the one controlling the game. Better way to deal with this?*/
    setSaveID(saverID) {
        console.log("SaverID", saverID);
        saveID = saverID;
    }

    /*Method to load a save if one does not exist for a current ID*/
    loadOrCreateSave(saveID) {
        /*Using a try/catch block for code flow is awful and I'll create some alternative 
        but not right now*/
        var saveMatchingID;
        try {
            saveMatchingID = JSON.parse(fs.readFileSync("./documents/saves/" + saveID + ".save", "utf8"));
        } catch (err) {
            if (err.code === "ENOENT") {
                var newSaveFile = JSON.parse(fs.readFileSync("./documents/saves/saveTemplate", "utf8"));
                newSaveFile.gameState = "0";
                fs.writeFileSync("./documents/saves/" + saveID + ".save", JSON.stringify(newSaveFile, null, "  "));
                activeSave = newSaveFile;
                return;
            } else {
                throw err;
            }
        }
        // console.log("here");
        activeSave = saveMatchingID;

    }

    /*Set the game state on the current active save*/
    setGameState(newGameState) {
        activeSave.gameState = newGameState;
    }

    getGameState(saveID) {
        if (activeSave) {
            return activeSave.gameState;
        } else {
            this.loadOrCreateSave(saveID);
            // console.log("now here", activeSave.gameState);
            return activeSave.gameState;
        }
    }

    updateSave(param, value) {
        return;
    }
}

module.exports = new SaveHandler();
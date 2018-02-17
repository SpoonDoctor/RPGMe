"use strict";
class RegexCommands {
    constructor() {
        /*Set up our regex strings*/
        this.helpCommand = /^rpgm [h|H]elp$/;
        this.beginCommand = /^rpgm [b|B]egin$/;
        this.loadCommand = /^rpgm [l|L]oad$/;
        this.saveCommand = /^rpgm [s|S]ave$/;

        this.printActiveCommand = /^debug [a|A]ctive$/;
    }
}

module.exports = new RegexCommands();
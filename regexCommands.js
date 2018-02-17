class RegexCommands
{
  constructor()
  {
    /*Set up our regex strings*/
    this.helpCommand = /^rpgm [h|H]elp$/;
    this.beginCommand = /^rpgm [b|B]egin$/;
  }
}

module.exports = new RegexCommands();
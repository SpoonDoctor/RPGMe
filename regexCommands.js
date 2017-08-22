class RegexCommands
{
  constructor()
  {
    this.helpCommand = /^rpgm [h|H]elp$/;
    this.beginCommand = /^rpgm [b|B]egin$/;
  }
}

module.exports = new RegexCommands();
const Discord = require('discord.js');
const config = require("../config.js");
module.exports = async (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
	  
    let prefix = config.bot.prefix;
    
  if (message.content.includes(`<@${client.user.id}>`)) return message.channel.send(embed)
  if (message.content.includes(`<@!${client.user.id}>`)) return message.channel.send(embed)
  if (!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (cmd) cmd.run(client, message, args);
};
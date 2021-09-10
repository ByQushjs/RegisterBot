const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require("../config.js");
const wait = require("util").promisify(setTimeout);
const { createCanvas } = require('canvas')
const Database = require("void.db");
const db = new Database("../db.json");

exports.run = async (client, message, args) => {

let member = message.mentions.members.first();
      if (!member) {
        let member = message.author;
      }


if(config.settings.myRegisters == "YES" || config.settings.myRegisters == "EVET") {
  let registers = db.get(`${member.id}`);
  const embed = new Discord.MessageEmbed()
  .setAuthor()
  .setTitle(config.embed.registersTitle.replace(/{registers}/g, registers).replace(/{username}/g, member.username).replace(/{userTag}/g, member.tag).replace(/{tagUser}/g, `<@${member.id}>`))
  .setFooter("")
  .setTimestamp()
  if(config.settings.meEmbedWithEmojiNumbers == "YES" || config.settings.meEmbedWithEmojiNumbers == "EVET") {
    registers.replace(/"1"/g, config.emojis.one).replace(/"2"/g, config.emojis.two).replace(/"3"/g, config.emojis.three).replace(/"4"/, config.emojis.four).replace(/"5"/g, config.emojis.five).replace(/"6"/g, config.emojis.six).replace(/"7"/g, config.emojis.seven).replace(/"8"/g, config.emojis.eight).replace(/"9"/g, config.emojis.nine).replace(/"0"/g, config.emojis.zero)
  embed.setDescription(config.embed.registersDescription.replace(/{registers}/g, registers).replace(/{username}/g, member.username).replace(/{userTag}/g, member.tag).replace(/{tagUser}/g, `<@${member.id}>`))
  } else {
    embed.setDescription(config.embed.registersDescription.replace(/{registers}/g, registers).replace(/{username}/g, userName).replace(/{username}/g, member.username).replace(/{userTag}/g, member.tag).replace(/{tagUser}/g, `<@${member.id}>`))
  }
message.reply({embed: embed})
}
}
exports.config = {
  name: "me",
  enabled: true,
  guildOnly: true,
  aliases: ["kayitlarım","kayıtlarım"]
}
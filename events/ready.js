const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const config = require("../config.js");
const wait = require("util").promisify(setTimeout);

module.exports = async client => {

  console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} | `)
  console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} | Logged As ${client.user.tag}.`);
  console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} | Bot is in ${client.guilds.cache.size} & has ${client.channels.cache.size} channels, ${client.users.cache.size} users.`);

  const version = config.version
  const prefix = config.prefix
  client.user.setStatus(config.bot.status);
  client.user.setActivity(config.bot.event);

};
const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const { MessageButton } = require('discord-buttons');
const config = require("../config.js");
const wait = require("util").promisify(setTimeout);
const { createCanvas } = require('canvas')
const Database = require("void.db");
const db = new Database("../db.json");

exports.run = async (client, message, args) => {

  if (!message.member.roles.cache.has(config.settings.authorizedRole)) return
  const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  let name = args[1];
  let age = args[2];

  if (!member) return message.channel.send(config.text.forgotTag.replace(/{warn}/g, config.emojis.warn))
  if (!name) return message.channel.send(config.text.forgotName.replace(/{warn}/g, config.emojis.warn))
  if (!age) return message.channel.send(config.text.forgotAge.replace(/{warn}/g, config.emojis.warn))

let sayHiEmoji = "";
if(config.emojis.sayHiEmoji == "") {
  let sayHiEmoji = "https://cdn.discordapp.com/emojis/823515042217459752.gif";
} else {
  let sayHiEmoji = `${config.emojis.sayHiEmoji}`
}
  let manButton = new MessageButton()
    .setLabel("MAN")
    .setStyle("blurple")
    .setID("man")
  let womanButton = new MessageButton()
    .setLabel("WOMAN")
    .setStyle("red")
    .setID("woman")
  let cancelButton = new MessageButton()
    .setLabel("CANCEL")
    .setStyle("gray")
    .setID("cancel")


  const successEmbed = new Discord.MessageEmbed()
    .setTitle(config.embed.successTitle.replace(/{member}/g, `${member.user.username}`))
    .setColor("GREEN")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(config.embed.successDescription.replace(/{member}/g, `<@${member.id}>`))
  const cancelEmbed = new Discord.MessageEmbed()
    .setTitle(config.embed.cancelTitle.replace(/{member}/g, `${member.user.username}`))
    .setColor("GREEN")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(config.embed.cancelDescription.replace(/{member}/g, `<@${member.id}>`))
  const welcomeEmbed = new Discord.MessageEmbed()
    .setTitle(config.embed.welcomeChatTitle.replace(/{member}/g, `${member.user.username}`))
    .setColor("GREEN")
    .setThumbnail("https://cdn.discordapp.com/emojis/823515042217459752.gif")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(config.embed.welcomeChatDescription.replace(/{member}/g, `<@${member.id}>`))
  const chooseEmbed = new Discord.MessageEmbed()
    .setTitle(config.embed.chooseTitle.replace(/{member}/, member.user.username))
    .setColor("BLURPLE")
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setDescription(config.embed.chooseDescription.replace(/{member}/g, `<@${member.id}>`))

  if (config.settings.registerViaGender == "YES" || config.settings.registerViaGender == "EVET") {
    message.channel.send({ embed: chooseEmbed, buttons: [manButton, womanButton, cancelButton] }).then(async msg => {
      const filter = (button) => button.clicker.user.id === message.author.id;
      const collector = await msg.createButtonCollector(filter, { time: 60000 });

      collector.on('collect', async b => {
        let manrole = message.guild.roles.cache.get(config.settings.manRole);
        let womanrole = message.guild.roles.cache.get(config.settings.womanRole);
        let memberrole = message.guild.roles.cache.get(config.settings.memberRole);
        if (b.id == "man") {
          message.mentions.members.first().roles.add(config.settings.manRole)
          message.mentions.members.first().roles.add(config.settings.memberRole)
          msg.delete().then(message.channel.send(successEmbed))
          message.guild.members.cache.get(member.id).setNickname(config.settings.nameFormat.replace(/{age}/g, age).replace(/{name}/g, name))
          if (config.settings.chatChannel !== "") return client.channels.cache.get(config.settings.chatChannel).send(welcomeEmbed).then(async message1 => {
            await message1.react(config.emojiler.hello);
          })
          if (db.get(`${message.author.id}`) != null) {
            db.set(`${message.author.id}`, 1);
          } else {
            db.add(`${message.author.id}`, 1);
          }
        }
        if (b.id == "woman") {
          message.mentions.members.first().roles.add(config.settings.womanRole)
          message.mentions.members.first().roles.add(config.settings.memberRole)
          message.guild.members.cache.get(member.id).setNickname(config.settings.nameFormat.replace(/{age}/g, age).replace(/{name}/g, name))
          msg.delete().then(message.channel.send(successEmbed))

          if (config.settings.chatChannel !== "") return client.channels.cache.get(config.settings.chatChannel).send(welcomeEmbed).then(async message1 => {
            await message1.react(config.emojis.hello);
          })

          if (db.get(`${message.author.id}`) != null) {
            db.set(`${message.author.id}`, 1);
          } else {
            db.add(`${message.author.id}`, 1);
          }
        }
        if (b.id == "cancel") {
          msg.delete().then(message.channel.send(cancelEmbed))
        }

      })

    })
  }
  if (config.settings.registerViagender == "NO" || config.settings.registerViagender == "HAYIR") {
    message.mentions.members.first().roles.add(config.settings.memberRole)
    message.guild.members.get(member.id).setNicknamemessage.guild.members.cache.get(member.id).setNickname(config.settings.nameFormat.replace(/{age}/g, age).replace(/{name}/g, name))
    message.channel.send(successEmbed);
    if (db.get(`${message.author.id}`) != null) {
      db.set(`${message.author.id}`, 1);
    } else {
      db.add(`${message.author.id}`, 1);
    }
    if (config.settings.chatChannel !== "") return client.channels.cache.get(config.settings.chatChannel).send(welcomeEmbed).then(async message1 => {
      await message1.react(sayHiEmoji);
    })



  }

  if (config.settings.timeout == "YES" || config.settings.timeout == "EVET") {
    await wait(10000);
    message.channel.send("Time has ended.")
  }
}
exports.config = {
  name: "register",
  enabled: true,
  guildOnly: true,
  aliases: ["k", "kayit"]
}
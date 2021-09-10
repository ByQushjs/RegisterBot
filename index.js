const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.js");
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const Canvas = require('canvas');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map();


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.config.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.config.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

const init = async () => {
  await fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err)
    console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} | ${files.length} komut yükleniyor...`)
    files.forEach((f, i) => {
      let pull = require(`./commands/${f}`);
      console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} | ${pull.config.name.toUpperCase()} adlı komut yüklendi!`)
      client.commands.set(pull.config.name, pull);  
      pull.config.aliases.forEach(alias => {
        client.aliases.set(alias, pull.config.name)
      });
    });
  });

  await fs.readdir('./events/', (err, files) => {
  if (err) console.error(err);
    console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} |`)
    console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} | ${files.length} olay yükleniyor...`);
    files.forEach(f => {
      const eventName = f.split(".")[0];
      const event = require(`./events/${f}`);
      client.on(eventName, event.bind(null, client));
      console.log(`${moment().format("HH:mm:ss DD/MM/YYYY")} | ${eventName.toUpperCase()} adlı olay yüklendi!`);
    });
  });


  
}

init()


client.on("guildMemberAdd", async (member) => {

if(member.user.bot) {
  if(config.settings.botRole !== "") {
  member.roles.add(config.settings.botRole);
  }
  return
}

  let months = {
			"01": "January",
			"02": "Februrary",
			"03": "March",
			"04": "April",
			"05": "May",
			"06": "June",
			"07": "July",
			"08": "August",
			"09": "September",
			"10": "October",
			"11": "November",
			"12": "December"
    }

    const welcomeEmbed = new Discord.MessageEmbed()
    .setColor(config.bot.embedColor)
    .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(config.embed.welcomeTitle.replace(/newmember/g, member.username).replace(/{totalmember}/g, member.guild.memberCount))
    .setDescription(config.embed.welcomeDescription.replace(/{newmember}/g, member.username).replace(/{totalmember}/g, member.guild.memberCount).replace(/{date}/g, `${moment(member.createdAt).format('DD')} ${months[moment(member.createdAt).format('MM')]} ${moment(member.createdAt).format('YYYY HH:mm:ss')}`).replace(/{authorizedrole}/g, `<@&${config.settings.authorizedRole}>`))
    .setFooter(`${member.user.username}`,member.user.displayAvatarURL({dynamic:true}))
    .setTimestamp()
    if(config.settings.sendBanner == "YES" || config.settings.sendBanner == "EVET") {

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

      if(config.settings.bannerBackground == "") {
          const banners = [
   'http://img7.mynet.com/galeri/2016/02/22/040902157/3644149-1366x768.jpg',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Sunrise_at_Lake_Bled.jpg/534px-Sunrise_at_Lake_Bled.jpg',
   'https://i.internethaber.com/2/720/450/images/gallery/37266/b.jpg'
  ];
  const response = banners[Math.floor(Math.random() * wallpapers.length)];


        let banner = `${response}`;
      } else {
        let banner = `${config.settings.bannerBackground}`;
      }
      const canvas = Canvas.createCanvas(700, 250);
	const context = canvas.getContext('2d');
  const background = await Canvas.loadImage(`${banner}`);
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
  	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
	context.drawImage(avatar, 25, 25, 200, 200);
  	context.beginPath();
	context.arc(125, 125, 100, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
  context.font = applyText(canvas, member.displayName);
	context.fillStyle = '#ffffff';
	context.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);
  
  const attachment = new MessageAttachment(canvas.toBuffer(), 'newuser.png');
  

    
    welcomeEmbed.setImage('attachment://newuser.png')
    
    }

let channel = client.channels.cache.get(config.settings.welcomeChannel)
  channel.send(welcomeEmbed)
  if (config.settings.tagAuthorized == "YES" || config.settings.tagAuthorized == "EVET"){
  channel.send(`<@&${config.settings.authorizedRole}>`).then(msg => msg.delete(1000))
}
})


require('discord-buttons')(client);

client.on('clickButton', async (button) => {
    button.defer(true);
});
client.login(config.bot.token);

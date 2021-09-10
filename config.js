/*
VARIABLES

For Register Command:
{name}: Name given when registration
{age}: Age given when registration

For Entring To Server:
{newmember} : Tags the new member.
{totalmember} : Writes total member in server.
{authorizedrole} : Tags authorizeds.
{date} : Shows Date when user created his/her account.

For Emojis:
{warn} : Sends Warning Emoji (Defined in emojis Part)

*/


module.exports = {
  bot: {
    token: "",
    prefix: ".",
    embedColor: "BLURPLE",
    event: "Register Bot By ByQush | Source at https://github.com/ByQushjs/registerbot", // Bot's Presence Event
    status: "idle" // Bot's Presence Status (idle, dnd, offline, online)
  },

  settings: {
    serverID: "", // Your Server ID
    botRole: "", // The role when the bot enters
    authorizedRole: "",// Authorized Role ID
    manRole: "",// Man Role in server. Not need if want to give only MEMBER role.
    womanRole: "",// Woman Role in server. Not need if want to give only MEMBER role.
    memberRole: "",// General Member Role when will be given on register.
    welcomeChannel: "",// Register Channel
    chatChannel: "",// Chat channel. Fill it if you want to welcome new members on chat channel.
    nameFormat: "{name} | {age}",//{name} | {age} will be like John | 42 .
    registerViaGender: "",// Fill it as YES if you want to register new members with their gender. Otherwise NO . It'S cAsE sEnSiTiVe.
    tagAuthorized: "", // Tags Authorized When Someone Enters To Server.

    /* ---------------------- BETA -------------------- */
    /* -------------- Will be avaible soon. ----------- */
    sendBanner: "", // Sends a banner with users details in Welcome Embed.
    bannerBackground: "", // Sets the background of new user banner. You can leave it blank. NEEDS URL!
    myRegisters: "", // If you want to show authorizeds regiters. Write YES.
    meEmbedWithEmojiNumbers: "" // If you want to show registers with emojis, Write YES.
  },

  emojis: {
    hello: "",
    warn: "",

    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
    seven: "",
    eight: "",
    nine: "",
    zero: ""
    
  },

  text: {
    forgotTag: "Forgot to tag user :)",
    forgotName: "Forgot to provide Name :)",
    forgotAge: "Forgot to say Age :)"
  },
  embed: {
    welcomeTitle: "Welcome to our server {newuser}!!",
    welcomeDescription: "{hello} Hello {newuser}! We are {totaluser} member totally with YOU!",
    chooseTitle: "Choose Gender",
    chooseDescription: "Choose {member}'s Gender Please...",
    successTitle: "{member} has been registered!",
    successDescription: "You had registered {member} successfully. Welcome in chat!",
    cancelTitle: "Operation Canceled.",
    cancelDescription: "Registration has been canceled and ended.",
    welcomeChatTitle: "Say Hi to {member}!",
    welcomeChatDescription: "Welcome {member} here :)",
    registersTitle: "{username}'s Registers ;",
    registersDescription: "{username} has totally {registers}."
  }
}

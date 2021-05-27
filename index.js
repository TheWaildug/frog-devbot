
const Discord = require("discord.js")
const client = new Discord.Client();
const express = require("express")
const Topgg = require("@top-gg/sdk")
const prefix = "!"
const abc = require("./values/abc")
const randommoderate = require("./randommoderate")
const roles = require("./values/roles")
const slurs = require("./values/slurs")
const nsfw = require("./values/nsfw")
const math = require("mathjs")
const fs = require("fs");
const mock = require("./mock")
const token = process.env.token
const ms = require("ms")
const server = express()
const Database = require("@replit/database")
const { ReactionRoleManager } = require('discord.js-collector')

const reactionRoleManager = new ReactionRoleManager(client, {
    storage: true, 
    path: __dirname + '/roles.json', 
    mongoDbLink: process.env.mongourl
});
const db = new Database()
const webhook = new Topgg.Webhook(process.env.webauth) 
client.Commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.Commands.set(command.name, command);
}


client.on("ready", async () => {

   console.log("I am ready to crash!")
  db.get("Status").then(stat =>{
         client.user.setPresence({ activity: { name: stat.toString(), type: `WATCHING` }, status: 'dnd' })
  })
  
})  

reactionRoleManager.on('ready', () => {
    console.log('Reaction Role Manager is ready!');
});

reactionRoleManager.on('reactionRoleAdd', (member, role) => {
    console.log(member.displayName + ' got the role ' + role.name)
});


reactionRoleManager.on('reactionRoleRemove', (member, role) => {
    console.log(member.displayName + ' lost the role ' + role.name)
});


reactionRoleManager.on('allReactionsRemove', (message) => {
    console.log(`All reactions from message ${message.id} were removed, all roles was taken and reactions roles deleted.`)
});


reactionRoleManager.on('missingRequirements', (type, member, reactionRole) => {
    console.log(`Member '${member.id}' will not win role '${reactionRole.role}', because him hasn't requirement ${type}`);
});


reactionRoleManager.on('missingPermissions', (action, member, roles, reactionRole) => {
    console.log(`Some roles cannot be ${action === 1 ? 'given' : 'taken'} to member \`${member.displayName}\`, because i don't have permissions to manage these roles: ${roles.map(role => `\`${role.name}\``).join(',')}`);
});
 function isbypass(user){
 for (let i = 0; i < roles.length; i++) {
 
   if(user.roles.cache.has(roles[i])){
     
     return true;
   }
 }

 return false;
}
///Filter
client.on("message",async message => {
  if(message.guild == null){
    return;
  }
  if(message.author.bot){
    return;
  }
  
  const emoji = message.guild.emojis.cache.get("808886280569225247")
  if(message.content.toLowerCase().includes("https://discord.gg/") || message.content.toLowerCase().includes("discord.gg/")){
        if(isbypass(message.member) === true){
      console.log("this man can post invites?")
    return;
  }
  console.log(`${message.member.id} posted invite.`)
  message.channel.send(`${emoji} ${message.member}, you're not allowed to post Discord invites! Continuing will result in a mute`).then(msg => {
    message.delete();
    msg.delete({timeout: 5000})
    return;
  })
  }

let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
let cdu = regexp.test(message.content.toLowerCase().replace(/\s+/g, ''))
   if(cdu == true ){
        if(isbypass(message.member) === true){
      console.log("this man can post links?")
    return;
  }
  console.log(`${message.member.id} posted link.`)
  message.channel.send(`${emoji} ${message.member}, you're not allowed to post links! Continuing will result in a mute`).then(msg => {
    message.delete();
    msg.delete({timeout: 5000})
    return;
  })
  }
  if(message.mentions.members.size >= 5){
    if(isbypass(message.member) === true){
      console.log("this man can spam ping?")
    return;
  }
    console.log(`${message.member.id} spam pinged.`)
    message.channel.send(`${emoji} ${message.member}, you're not allowed to spam ping users! Continuing will result in a mute`).then(msg => {
      message.delete();
      msg.delete({timeout: 5000})
      return;
    })
  }
  if(message.mentions.members.has("432345618028036097")){

    if(isbypass(message.member) == true){
      console.log("this man can ping frog")
    return;
  }
     console.log(`${message.member.id} pinged froggo.`)
    message.channel.send(`${emoji} ${message.member}, you're not allowed to ping TheWaildug! Continuing will result in a mute`).then(msg => {
      message.delete();
      msg.delete({timeout: 5000})
      return;
    })
  }
  
const msg = message.content.split(" ").join("")
  for (let i = 0; i < slurs.length; i++) {
   if(msg.replace(/[^a-zA-Z ]/g, "").toLowerCase().includes(slurs[i])){
       if(isbypass(message.member) == true){
      console.log("this man can say slurs?")
    return;
  }
      console.log(`${message.member.id} said slur.`)
    
    message.channel.send(`${emoji} ${message.member}, you're not allowed to use racial slurs! Continuing will result in a mute`).then(me => {
      message.delete();
      me.delete({timeout: 5000})
      return;
    })
    return;
    }

   
 }
 
 for (let i = 0; i < nsfw.length; i++) {
  
   if(msg.replace(/[^a-zA-Z ]/g, "").toLowerCase().includes(nsfw[i])){
    
       if(isbypass(message.member) == true){
      console.log("this man can say nsfw things?")
    return;
  }
      console.log(`${message.member.id} said nsfw word.`)
    
    message.channel.send(`${emoji} ${message.member}, you're not allowed to say NSFW/Sexual things. Continuing will result in a mute`).then(me => {
      message.delete();
      me.delete({timeout: 5000})
      return;
    })
    return;
    }

   
 }

  
  
})
client.on("messageDelete", async message => {
  if(message.guild == null){
    return;
  }
  if(message.author.bot){
    return;
  }
  const channel = message.guild.channels.cache.get("797584651060772864")
  if(message.content){
    console.log(`${message.author.id} deleted a message in the channel ${message.channel.id} with the content ${message.content}`)
    const embed = new Discord.MessageEmbed()
    .setTitle("Message Deleted")
    .setColor("FF0000")
    .addField(`Author`,`<@${message.author.id}>`)
    .addField(`Channel`,`<#${message.channel.id}>`)
    .addField(`Content`,`${message.content}`)
    .setTimestamp()
    channel.send(embed)
  }
})
client.on("guildMemberAdd", async member => {
  console.log(`${member.user.tag} just joined the server!`)
  const {guild} = member
  const channel = guild.channels.cache.find(r => r.id == "793936084157464576")
  if(!channel){
    return console.log(`I cannot find the welcome channel.`);
  }
  if(member.id != "745325943035396230"){
     let avatarurl = member.avatarURL({format: "jpg", dynamic: true, size: 512}) || member.user.defaultAvatarURL
  console.log(avatarurl)
  const embed = new Discord.MessageEmbed()
  .setTitle(`Welcome to ${guild.name}!`)
  .setDescription(`Glad you could make it. Please make sure to read <#793607349041758238> to gain access to the server.`)
  .setColor("RANDOM")
  .setThumbnail(avatarurl)
  .setTimestamp()
  channel.send(`${member}`,embed)
 
  }
  const role = await guild.roles.fetch("793941958271303731")
  if(member.id == "745325943035396230"){
    member.roles.add(role,`stupid`)
  }
})



///username change
client.on("guildMemberUpdate", async (oldmember, newmember) => {
  if(oldmember.displayName != newmember.displayName){
    const fetchedLogs = await oldmember.guild.fetchAuditLogs({
		limit: 1,
		type: 24,
	});
  const nicklog = fetchedLogs.entries.first();
  let { executor, target, reason } = nicklog;
 if(reason == null){
   reason = "None."
 }
 if(reason == "AFK"){
   return;
 }
 if(reason == "Return from AFK"){
   return;
 }
    if(reason.includes("Moderated by")){
      return;
    }
  if(!nicklog){
   console.log(`${oldmember.user.tag}'s username was changed from ${oldmember.displayName} to ${newmember.displayName} by an unknown user`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`Nickname Change`)
  
    .setColor("FF0000")
    .addField(`User`,`<@${newmember.id}>`)
    .addField(`Old Nickname`,oldmember.displayName)
    .addField(`New Nickname`,newmember.displayName)
     .setTimestamp()
   const channel = await oldmember.guild.channels.cache.find(r=> r.id == "797584651060772864")
    channel.send(embed)
  }
  console.log(`${oldmember.user.tag}'s username was changed from ${oldmember.displayName} to ${newmember.displayName} by ${executor.tag}`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`Nickname Change`)
   
    .setColor("FF0000")
    .addField(`User`,`<@${newmember.id}>`)
    .addField(`Old Nickname`,oldmember.displayName)
    .addField(`New Nickname`,newmember.displayName)
    .addField("Reason",reason)
    .addField(`Changer`,`<@${executor.id}>`)
     .setTimestamp()
   const channel = await oldmember.guild.channels.cache.find(r=> r.id == "797584651060772864")
    channel.send(embed)
  }
})  
server.post("/servervote", webhook.middleware(), async (req, res) => {
  return;
  const user = await client.users.fetch(req.vote.user)
  if(!user){
    return console.log(`Cannot find user!`)
  }
  console.log(`${user.id} has voted for the support server!`)
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Thanks For Voting!")
  .setDescription(`Thanks you for voting for the support server! You will have the "Voted" role in the support server, https://discord.gg/qyHnGP5yMP for 12 hours.`)
  user.send(embed).catch(error => {
    console.log(`Error: ${error}`)
  })
  const guild = client.guilds.cache.find(g => g.id == "791760625243652127")
  if(!guild){
    return console.log(`Cannot find guild!`);
  }
  const channel = guild.channels.cache.find(c => c.id == "793598695382843402")
  if(!channel){
    return console.log(`Cannot find channel!`)
  }
  channel.send(`<@${user.id}> has voted for the server!`)
  const role = guild.roles.cache.find(r => r.id == "796439384940871701")
  if(!role){
    return console.log(`Cannot find role!`)
  }
  const guildmember = guild.members.cache.find(m => m.id == user.id)
  if(!guildmember){
    return console.log(`Cannot find guild member.`)
  }
  guildmember.roles.add(role,"Voted for the server!")
  setTimeout(() => {
    guildmember.roles.remove(role,"12 Hour voting period over.")
  }, 43200000)
      return;
})

client.on("message", async message => {
  if(message.guild == null){
    return;
  }
  if(!message.content.startsWith(prefix)){
    return;
  }
  if(message.author.bot){
    return;
  }
  const args = message.content.slice(prefix.length).split(" ")
  const command = args.shift().toLowerCase();
  if(command == "eval"){
if(message.member.id != "432345618028036097"){
  return message.delete();
}
   
      console.log("Eval")
    
      let code = message.content.split(" ").slice(1).join(" ")
     
      console.log(`Evaluate ${message.author.id}`)
      let evaluated
       
    try {
      evaluated = await eval(`(async () => {  ${code}})()`);
      console.log(evaluated)
      const evaltype = typeof evaluated;
      const embed = new Discord.MessageEmbed()
            .setTitle(`Evaluation`)
            .setColor("RANDOM")
            .setDescription(`Evaluated in *${Date.now() - message.createdTimestamp + " ms"}.*`)
            .addField(`Input`,"```js\n" + code + "```")
            .addField(`Output`,"```js\n" + evaluated + "```")
            .addField("Output Type", "`" + evaltype.toUpperCase() + "`")
            .setTimestamp()
             message.channel.send(`<@${message.author.id}>`,embed)
            
    } catch (e) {
      console.log(e)
          const embed = new Discord.MessageEmbed()
          .setTitle(`Evaluation`)
              .setColor("RANDOM")
          .setDescription(`Error`)
          .addField(`Input`,"```js\n" + code + "```")
          .addField(`Error`,"```" + e + "```")
          .setTimestamp()
           message.channel.send(`<@${message.author.id}>`,embed)
    }
}else if(command == "role"){
  client.Commands.get("role").execute(message,args)
}else if(command == "cantlive"){
  const emoji = message.guild.emojis.cache.get("808886280569225247")
 
    
  console.log(`${message.member.id} lost life privileges.`)
  message.channel.send(`${emoji} ${message.member}, you're not allowed to live! Continuing will result in a mute.`).then(msg => {
    message.delete();
    msg.delete({timeout: 5000})
    return;
  })

}else if(command == "mock"){
  client.Commands.get("mock").execute(message,args)
}else if(command == "slowmode"){
  client.Commands.get("slowmode").execute(message,args,ms)
}else if(command == "moderate"){
  client.Commands.get("moderate").execute(message,args,abc)
}else if(command == "restrict"){
  client.Commands.get("restrict").execute(message,args)
}else if(command == "unrestrict"){
  client.Commands.get("unrestrict").execute(message,args)
}else if(command == "rr"){
  client.Commands.get(`reactionrole`).execute(message,args,reactionRoleManager)
}else if(command == "rrremove"){
  client.Commands.get("rrremove").execute(message,args,reactionRoleManager)
}else if(command == "ping"){
  const ping = Date.now() - message.createdTimestamp
  message.reply(`Pong! ${ping} ms.`)
}else if(command == "react"){
  client.Commands.get("react").execute(message,args)
}else if(command == "nick"){
  client.Commands.get("nick").execute(message,args)
}else if(command == "unban"){
 
  if(!message.member.hasPermission(`BAN_MEMBERS`)){
    return message.delete();
  }
  client.Commands.get("unban").execute(message,args,db,client)

}else if(command == "ban"){
  if(!message.member.hasPermission(`BAN_MEMBERS`)){
    return message.delete();
  }
  client.Commands.get("ban").execute(message,args,db)
}else if(command == "purge"){
  client.Commands.get("purge").execute(message,args)
}else if(command == "status"){
if(message.member.id != "432345618028036097"){
  return message.delete();
}
let stat = message.content.split(" ").slice(1).join(" ")    

if(!stat){
  return message.reply('idiot I need a status')
}
console.log(stat)
db.set("Status",stat)
client.user.setPresence({ activity: { name: stat.toString(), type: `WATCHING` }, status: 'dnd' })
return message.reply("go check it out")
}
})
client.login(token)
server.all('/', (req, res)=>{
  res.send(':(')
})
server.post("/suggestion", async (req,res) => {
   const body = req.body
  const userid = body.userid
  const suggestion = body.suggestion
  let suggestionId = body.suggestionid
 console.log("suggestion")
  const exampleEmbed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("Suggestions")
            .setDescription(`New Suggestion from <@${userid}>`)
            .addFields(
              { name: "Suggestion: ", value: `${suggestion}`},
      
            )
            .setTimestamp()
            .setFooter(`Suggestion ID: ${suggestionId}.`)
            .setColor('#1aff1a');
           channel.send(exampleEmbed).then(sentEmbed => {
          sentEmbed.react("👍")
          sentEmbed.react("👎")
          db.set('SuggestionId',Number(suggestionId) + 1)
          db.set(`SuggestionId${suggestionId}`,sendembed.id)
           })
})
 
  server.listen(3000, ()=>{console.log("Server is Ready!")});

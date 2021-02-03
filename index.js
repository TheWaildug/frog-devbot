
const Discord = require("discord.js")
const client = new Discord.Client();
const express = require("express")
const Topgg = require("@top-gg/sdk")
const prefix = "!"
const fs = require("fs");
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
setInterval(async function(){
  
   const list = await db.getAll()
  const key = Object.keys(list)
  key.forEach(async function(item, index, array) {
    
    if(item.toString().includes(`Guild-791760625243652127-MuteMS-`)){
      const value = Object.values(list)
      value.forEach(async function(iam,ide,arra){
        if(ide == index){
          if(Date.now() >= iam){
            const userid = item.toString().replace(`Guild-791760625243652127-MuteMS-`,"")
            console.log("user should be unmuted")
            const guild = await client.guilds.fetch("752978800756916444")
            if(guild){
              db.delete(`Guild-791760625243652127-IsMuted-${userid}`)
              db.delete(`Guild-791760625243652127-MuteMS-${userid}`)
              let notsplit = await db.get(`Guild-791760625243652127-MuteMessage-${userid}`)
              
              console.log(notsplit)
                let message
                message = notsplit.split("/")
                console.log(message[6])

                const channel = await guild.channels.cache.find(c => c.id == message[5])  
                const embed = new Discord.MessageEmbed()
                .setTitle(`Moderation`)
                .setDescription(`New Unmute`)
                if(channel){
                  channel.send(`Auto Unmuted <@${userid}>. Message link: ${notsplit}`)
                }
                db.delete(`Guild-791760625243652127-MuteMessage-${userid}`)
                const user = await guild.members.cache.find(r => r.id == userid)
                if(user){
                  const role = await guild.roles.cache.find( r => r.id == "793938032860332086")
                  if(role){
                    user.roles.remove(role,`Auto Unmute`)
                  }
                }
            }
          }
        }
      })
  }})
},10000)

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

client.on("guildMemberAdd", async member => {
  console.log(`${member.user.tag} just joined the server!`)
  const {guild} = member
  const channel = guild.channels.cache.find(r => r.id == "793936084157464576")
  if(!channel){
    return console.log(`I cannot find the welcome channel.`);
  }
  const embed = new Discord.MessageEmbed()
  .setTitle(`Welcome to ${guild.name}!`)
  .setDescription(`Glad you could make it. Please make sure to read <#793607349041758238> to gain access to the server.`)
  .setColor("RANDOM")
  .setThumbnail(member.user.avatarURL())
  .setTimestamp()
  channel.send(`${member}`,embed)
})

client.on("guildBanAdd",async (guild, user) => {
  
   const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 22,
	});
  const banlog = fetchedLogs.entries.first();
  if(!banlog){
    return console.log(`${user.tag} was banned and that's all we know.`)
  }
   let { executor, target, reason } = banlog;
   if(reason = null){
     reason = "None."
   }
   console.log(`${executor.username}#${executor.discriminator} banned ${target.tag} with the reason ${reason}.`)
   const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`User Banned`)
    .setColor("FF0000")
    .addField(`User`,`<@${target.id}>`)
    .addField(`Sender`,`<@${executor.id}>`)
    .addField(`Reason`,`${reason}`)
    .setTimestamp()
     const channel = await guild.channels.cache.find(r => r.id == "794293979515977798")
    if(!channel){
      return console.log(`I cannot find the logs channel!`);
    }
    channel.send(embed)
})
client.on("guildBanRemove",async (guild, user) => {
  
   const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 23,
	});
  const banlog = fetchedLogs.entries.first();
  if(!banlog){
    return console.log(`${user.tag} was unbanned and that's all we know.`)
  }
   let { executor, target, reason } = banlog;
   if(reason == null){
     reason = "None."
   }
   console.log(`${executor.username}#${executor.discriminator} unbanned ${target.tag} with the reason ${reason}.`)
   
   const embed = new Discord.MessageEmbed()
    .setTitle(`UNBAN`)
    .setColor("FF0000")
    .addField(`User`,`<@${target.id}>`)
    .addField(`Sender`,`<@${executor.id}>`)
    .addField(`Reason`,`${reason}`)
    .setTimestamp()
      const channel = await guild.channels.cache.find(r => r.id == "794293979515977798")
    if(!channel){
      return console.log(`I cannot find the logs channel!`);
    }
    channel.send(embed)
})
server.post("/servervote", webhook.middleware(), async (req, res) => {
  const user = await client.users.fetch(req.vote.user)
  if(!user){
    return console.log(`Cannot find user!`)
  }
  console.log(`${user.id} has voted for the support server!`)
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Thanks For Voting!")
  .setDescription(`Thanks you for voting for my support server! You will have the "Voted" role in the support server, https://discord.gg/qyHnGP5yMP for 12 hours.`)
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
  const args = message.content.slice(prefix.length).split(" ")
  const command = args.shift().toLowerCase();
  if(command == "eval"){
if(message.member.id != "432345618028036097"){
  return message.delete();
}
   
      let code = message.content.split(" ").slice(1).join(" ")
     
      console.log(`Evaluate ${message.author.id}`)
      let evaluated
       
    try {
      evaluated = await eval(`(async () => {  ${code}})()`);
      console.log(evaluated)
      const embed = new Discord.MessageEmbed()
            .setTitle(`Evaluation`)
            .setDescription(`Evaluated in *${Date.now() - message.createdTimestamp + " ms"}.*`)
            .addField(`Input`,"```js\n" + code + "```")
            .addField(`Output`,"```js\n" + evaluated + "```")
            .setTimestamp()
             message.author.send(`<@${message.author.id}>`,embed).catch(() => {
               return message.channel.send(`Please open your DMs noob.`);
             })
            return message.delete();
    } catch (e) {
      console.log(e)
          const embed = new Discord.MessageEmbed()
          .setTitle(`Evaluation`)
          .setDescription(`Error`)
          .addField(`Input`,"```js\n" + code + "```")
          .addField(`Error`,"```" + e + "```")
          .setTimestamp()
           message.author.send(`<@${message.author.id}>`,embed).catch(() => {
               return message.channel.send(`Please open your DMs noob.`);})
return message.delete();
    }
}else if(command == "restrict"){
  client.Commands.get("restrict").execute(message,args)
}else if(command == "rr"){
  client.Commands.get(`reactionrole`).execute(message,args,reactionRoleManager)
}else if(command == "rrremove"){
  client.Commands.get("rrremove").execute(message,args,reactionRoleManager)
}else if(command == "react"){
  client.Commands.get("react").execute(message,args)
}else if(command == "ban"){
  if(!message.member.hasPermission(`BAN_MEMBERS`)){
    return message.delete();
  }
  client.Commands.get("ban").execute(message,args)
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

  server.listen(3000, ()=>{console.log("Server is Ready!")});

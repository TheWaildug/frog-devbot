const protect = [
  "792942766979022858"
]
const bypass = [
"792102531408986142"
]
const Discord = require("discord.js");
module.exports = {
  name: "restrict",
  description: "restricts people",
 async execute(message,args){
    if(!message.member.hasPermission("KICK_MEMBERS")){
      return message.delete();
    }
    console.log(`restrict ${message.author.id}`)
    let mentionmember;

    let cont;
 
     if (message.mentions.members.first()) {
      mentionmember = await message.guild.members.cache.find(r => r.id ==  message.mentions.members
          .first().toLocaleString().replace("<@", "").replace(">", "")
          .replace("!",""))
    } else if (!message.mentions.members.first()) {
      
      mentionmember = await message.guild.members.cache.find(r => r.id == args[0])
    }
console.log(mentionmember.user.tag)
    if (!mentionmember) {
      message.reply(`yeah sure i'll just restrict myself.`);
      return;
    } 
    if(mentionmember.user.bot){
      return message.reply(`what did this bot do to you?`);
    }
    if(mentionmember.id == message.member.id){
      return message.reply(`got it i'll restrict you.`);
    }
   console.log(mentionmember.roles.highest.position)
    console.log(message.member.roles.highest.position)
    console.log(mentionmember.roles.highest.position >= message.member.roles.highest.position)
   if(mentionmember.roles.highest.position >= message.member.roles.highest.position){
     console.log("higher")
     return message.reply(`it's really rude to restrict people higher than you.`);
   }
   let e = message.content.split(" ").slice(2).join(" ")
 console.log(e)
  if (!e) {
    message.reply("please contain a reason!");
    return;
  }
   let important = false
  bypass.forEach(async (value,index) => {
 
      if(message.member.roles.cache.has(value)){
        important = true
      }
    })

    if(important == false){
      protect.forEach(async (va, ind) => {
        
        if(mentionmember.roles.cache.has(va)){
        
          message.reply(`it's really rude to restrict staff members.`);
          return;
        }
      })
    }
    const restrictrole = await message.guild.roles.fetch("794370456001839144")

    if(!restrictrole){
      console.log(`No restrict role.`)
      return message.reply(`I cannot find the restricted role.`);
    }
    if(mentionmember.roles.cache.has(restrictrole)){
      return message.reply(`yes i will restrict the restricted`);
    }
    const embed = new Discord.MessageEmbed()
    .setTitle(`User Restricted`)
    .setColor("FF0000")
    .addField(`User`,`<@${mentionmember.id}>`)
    .addField(`Sender`,`<@${message.member.id}>`)
    .addField(`Reason`,`${e}`)
    .setTimestamp()
     const channel = await message.guild.channels.cache.find(r => r.id == "794293979515977798")
    if(!channel){
      return console.log(`I cannot find the logs channel!`);
    }
    
    channel.send(embed)
    mentionmember.roles.add(restrictrole,`Restricted by ${message.author.tag} with the reason ${e}.`)
    mentionmember.send(`You have been restricted in` + "`" + message.guild.name + "` with the reason `" + e + ".` Please DM a moderator to appeal this." ).catch(() => {
       console.log(`cannot dm user`)
    })
    
    message.delete();
  }
}
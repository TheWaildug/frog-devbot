const protect = [
  "792942766979022858"
]
const bypass = [
"792102531408986142"
]
const Discord = require("discord.js");
module.exports = {
  name: "unrestrict",
  description: "unrestricts people",
 async execute(message,args){
    if(!message.member.hasPermission("KICK_MEMBERS")){
      return message.delete();
    }
    console.log(`unrestrict ${message.author.id}`)
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
      message.reply(`yeah sure i'll just unrestrict myself.`);
      return;
    } 
    if(mentionmember.user.bot){
      return message.reply(`what did this bot do to you?`);
    }
    if(mentionmember.id == message.member.id){
      return message.reply(`got it i'll unrestrict you.`);
    }
   console.log(mentionmember.roles.highest.position)
    console.log(message.member.roles.highest.position)
    console.log(mentionmember.roles.highest.position >= message.member.roles.highest.position)
   if(mentionmember.roles.highest.position >= message.member.roles.highest.position){
     console.log("higher")
     return message.reply(`it's really rude to unrestrict people higher than you.`);
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
        
          message.reply(`it's really rude to unrestrict staff members.`);
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
      return message.reply(`yes i will unrestrict the unrestricted`);
    }
    const embed = new Discord.MessageEmbed()
    .setTitle(`User Unrestricted`)
    .setColor("FF0000")
    .addField(`User`,`<@${mentionmember.id}>`)
    .addField(`Sender`,`<@${message.member.id}>`)
    .setTimestamp()
     const channel = await message.guild.channels.cache.find(r => r.id == "794293979515977798")
    if(!channel){
      return console.log(`I cannot find the logs channel!`);
    }
    
    channel.send(embed)
    mentionmember.roles.remove(restrictrole,`Unrestricted by ${message.author.tag}.`)
    
    message.delete();
  }
}
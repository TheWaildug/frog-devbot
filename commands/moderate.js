const Discord = require("discord.js")
const randommoderate = require("../randommoderate")
module.exports = {
  name: "moderate",
  description: "moderated nickname",
 async execute(message,args,abc){
       if(!message.member.hasPermission("MANAGE_NICKNAMES")){
      return message.reply(`it's a shame you can't run this command without the ` + "`" + "MANAGE_NICKNAMES" + "`" + ` permission.`)
    }
    console.log("moderate command")
      let mentionmember;

    let cont;
    
     if (message.mentions.members.first()) {
      mentionmember = message.mentions.members.first();
    }   else if (!message.mentions.members.first()) {
      
      mentionmember = await message.guild.members.cache.find(r => r.id == args[0])
    }
    if (!mentionmember) {
      message.reply("i'll just moderate nobody.");
      
      return;
    }
    if(mentionmember.user.bot){
      return message.reply(`What terrible name has this bot got?`)
    }
console.log(mentionmember.id)
 if (
          mentionmember.roles.highest.position >= message.member.roles.highest.position
        ) {
          console.log("higher");
          return message.reply("This user has an equal or higher role.");
        }
      
  const format = randommoderate()
  const oldnick = mentionmember.displayName
  mentionmember.setNickname(format,`Moderated by ${message.member.user.tag}`)
  message.reply("Done!")
  const embed = new Discord.MessageEmbed()
  .setTitle(`Moderate Nickname`)
  .addField(`User`,mentionmember)
  .addField(`Sender`,message.member)
  .setColor("FF0000")
  .addField(`Old Nick`,oldnick)
  .addField(`New Nick`,format)
  const channel = await message.guild.channels.cache.find(r => r.id == "794293979515977798")
  if(!channel){
  return console.log(`no logs channel`)
  }
  channel.send(embed)
  }
}
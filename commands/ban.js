const roles = [ "792942766979022858",
"792102531408986142",
"793940805207326820"
]
const protect = [
  "792942766979022858"
]
const bypass = [
"792102531408986142"
]
const Discord = require("discord.js")
module.exports = {
  name: "ban",
  description: "Bans people duh",
 async execute(message,args,db){
   
  let memberto, mentionMember, mentionmember;

  let cont = true;
  if (message.mentions.members.first()) {
    mentionMember = memberto = mentionmember = message.mentions.members.first();
  } else if (!message.mentions.members.first()) {
   
    mentionMember = memberto = mentionmember = message.guild.members.cache.find(m => m.id == args[0])
  }
 
  if (!mentionmember) {
      message.reply(`yeah sure i'll just ban myself.`);
      return;
    } 
     console.log(mentionMember.user.tag);
    if(mentionmember.user.bot){
      return message.reply(`what did this bot do to you?`);
    }
    if(mentionmember.id == message.member.id){
      return message.reply(`got it i'll ban you.`);
    }
   console.log(mentionmember.roles.highest.position)
    console.log(message.member.roles.highest.position)
    console.log(mentionmember.roles.highest.position >= message.member.roles.highest.position)
   if(mentionmember.roles.highest.position >= message.member.roles.highest.position){
     console.log("higher")
     return message.reply(`it's really rude to ban people higher than you.`);
   }
   let e = message.content.split(" ").slice(2).join(" ")
 console.log(e)
  if (!e) {
    message.reply("please contain a reason!");
    return;
  }
  mentionMember
    .send(
      `You have been banned from ${message.channel.guild}. Reason:` + "`" +
      e + "`"
    )
    .catch(() =>
      console.log(`Uh oh! I can't send a DM to ${memberto.user.tag}.`)
    );
  memberto
    .ban({
      reason: `Ban by ${message.member.user.tag} | Reason: ` + e
    })
    .catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    })
    .then(async () =>{
         const caseid = await db.get(`CaseID`)
       const embed = new Discord.MessageEmbed()
    .setTitle(`Case #${caseid}: User Banned.`)
    .setColor("FF0000")
    .addField(`User`,`<@${memberto.id}>`)
    .addField(`Sender`,`<@${message.member.id}>`)
    .addField(`Reason`,`${e}`)
    .setTimestamp()
     const channel = await message.guild.channels.cache.find(r => r.id == "794293979515977798")
    if(!channel){
      return console.log(`I cannot find the logs channel!`);
    }
    
    channel.send(embed)
      console.log(
        `We've just banned ${mentionMember.user.tag} with the reason ${
        e
        } by ${message.member.user.tag}`
        
      );
   
    const banemoji = message.guild.emojis.cache.get("808761388377964625")
     const banembed = new Discord.MessageEmbed()
     .setDescription(`${banemoji} <@${mentionMember.id}> has been **banned** with the Case ID ` + "`" + caseid + "`")
     .setFooter(`Banned`)
      .setColor("FF0000")
     .setTimestamp()
     message.channel.send(banembed)
     db.set(`CaseID`,caseid + 1)
  
  });

  
  }
}
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
  name: "unban",
  description: "unbans people duh",
 async execute(message,args,db,client){
   
  let memberto, mentionMember, mentionmember;

  let cont = true;
  if (args[0].includes("<@")) {
    return message.reply("just letting you know, you can't unban someone with mentioning them. You need to get their id.");
  } else if (!message.mentions.members.first()) {
   try{
     mentionMember = memberto = mentionmember = await message.guild.fetchBan(args[0])
   }catch(error){
     console.log(error)
     return message.reply("This user does not exist/is not banned.");
   }
    
  }

     console.log(mentionMember.user.tag);
    if(mentionmember.user.bot){
      return message.reply(`you cannot unban bots.`);
    }
  
 
  message.guild.members
    .unban(mentionMember.user.id,{
      reason: `Unban by ${message.member.user.tag}`
    })
    .catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    })
    .then(async () =>{
      const caseid = await db.get(`CaseID`)
       const embed = new Discord.MessageEmbed()
    .setTitle(`Case #${caseid}: User Unbanned.`)
    .setColor("FF0000")
    .addField(`User`,`<@${memberto.user.id}>`)
    .addField(`Sender`,`<@${message.member.id}>`)
    .setTimestamp()
     const channel = await message.guild.channels.cache.find(r => r.id == "794293979515977798")
    if(!channel){
      return console.log(`I cannot find the logs channel!`);
    }
    channel.send(embed)
      console.log(
        `We've just unbanned ${mentionMember.user.tag} by ${message.member.user.tag}`)
        
 
    const banemoji = message.guild.emojis.cache.get("808761388377964625")
     const banembed = new Discord.MessageEmbed()
     .setDescription(`${banemoji} <@${mentionMember.user.id}> has been **unbanned** with the Case ID ` + "`" + caseid + "`")
     .setFooter(`Unbanned`)
     .setColor("2AE67B")
     .setTimestamp()
     message.channel.send(banembed)
     db.set(`CaseID`,caseid + 1)
  
  });

  
  }
}
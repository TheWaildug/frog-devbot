const protect = [
  "792942766979022858",
  "792102531408986142",
]
const bypass = [
"792102531408986142"
]
module.exports = {
  name: "restrict",
  description: "restricts people",
 async execute(message,args){
    if(!message.member.hasPermissoon("KICK_MEMBERS")){
      return message.delete();
    }
    console.log(`restrict ${message.author.id}`)
    let mentionmember;

    let cont;
    console.log(args[0])
     if (message.mentions.members.first()) {
      mentionmember = await message.guild.members.fetch( message.mentions.members
          .first().toLocaleString().replace("<@", "").replace(">", "")
          .replace("!",""))
    } else if (!message.mentions.members.first()) {
      console.log(args[0]);
      mentionmember = await message.guild.members.fetch(args[0])
    }
    if (!mentionmember) {
      message.reply(`yeah sure i'll just restrict myself.`);
      return;
    }
    if(mentionmember.bot){
      return message.reply(`what did this bot do to you?`);
    }
   if(mentionmember.roles.highest.position >= message.member.roles.highest.positon){
     return message.reply(`it's really rude to restrict people higher than you.`);
   }
   let important = false
  bypass.forEach(async (index,value) => {
      if(message.member.roles.cache.has(value)){
        important = true
      }
    })
    if(important == false){
      protect.forEach(async (index, value) => {
        if(mentionmember.roles.cache.has(value)){
          return message.reply(`it's really rude to restrict staff members.`);
        }
      })
    }
  }
}
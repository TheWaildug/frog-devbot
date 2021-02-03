module.exports = {
  name: "rrremove",
  description: "removes reaction roles",
 async execute(message,args,reactionRoleManager){
     if(!args[0]){
      return message.channel.send(`!rrremove #Channel MSG_ID :emoji:`);
    }
       
       const channel = message.mentions.channels.first() || args[0]; 
const msg = await channel.messages.fetch(args[1]);
        if (!msg)
            return message.reply("yeah sure i'll just react to no message.")

          
            const emoji = args[2]
if (!emoji)
            return message.reply("yeah i'll just remove no reaction")
        await reactionRoleManager.deleteReactionRole({message: msg, emoji});
        
          

  }
}
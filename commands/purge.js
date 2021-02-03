module.exports = {
  name: `purge`,
  description: "purges messages duh",
  async execute( message,args){
    
          console.log(`purge ${message.member.id}`)
          let perm = false
          if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.delete();
          const amount = args[0]
          const perms = message.member.permissionsIn(message.channel).toArray();
        perms.forEach(async function(item,index,array){
        
            if(item == `MANAGE_MESSAGES`){
                perm = true
                if (!amount) return message.reply('uh bro i need messages to delete.'); // 
                if (isNaN(amount)) return message.reply(`uh bro this isn't a number.`); 
                if (amount > 100) return message.reply('dude only 100 messages can be deleted.'); 
                if (amount < 1) return message.reply('yeah i will just delete 0 messages.');
                const messages = await message.channel.messages.fetch({ limit: amount  })
                    message.channel.bulkDelete(messages 
                ).catch(error => {
                  console.log(`Error: ${error}`)
                   return message.delete();
                }).then(() => {
                  console.log("ok")
                })
                return;
              }
        }); if(perm == false){
            
            return message.delete();
        }
       
       
       
  }
}
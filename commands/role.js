module.exports = {
  name: `role`,
  description: "gives dude a role",
  async execute(message,args){
      if(!message.member.hasPermission('MANAGE_ROLES')){
     message.reply('bro you need the permission `MANAGE_ROLES`.')
     message.delete()
     return;
    }
    console.log('role command sent')
    let cont = true;
  let mentionMember;
  //If user dont mention a member, that show him this error msg
 if(!args[0]){
   return message.reply("sure i'll just give myself a role.")
 }
  if (message.mentions.members.first()) {
    mentionMember = message.mentions.members.first();
  } else if (!message.mentions.members.first()) {
    console.log(args[0]);
    mentionMember = await message.guild.members.cache.find(r => r.id == args[0]  
    )
  }
  if(!mentionMember){
    return message.reply("broooo that's crazy but I need a dude to give/remove a role to.")
  }
      console.log(mentionMember.user.tag)
      if (
    mentionMember.roles.highest.position >=
    message.member.roles.highest.position && mentionMember.id != message.member.id
  ) {

    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
    var mentionrole
   
    if(message.mentions.roles.first()){
      mentionrole = message.guild.roles.cache.find(r => r.id == message.mentions.roles.first().toLocaleString().replace("<@&","").replace(">",""))
   
    }else if(!message.mentions.roles.first()){
      if(isNaN(Number(args[1]))){
           mentionrole = message.guild.roles.cache.find(r => r.name == args[1])
      }else if(!isNaN(Number(args[1]))){
           mentionrole = message.guild.roles.cache.find(r => r.id == args[1])
      }
    
    }
    if(!mentionrole){
      return message.reply("duuuude @ a role or give me a name/id")
    }
    console.log(mentionrole.name)
    
    console.log(mentionrole.position)
    console.log(message.member.roles.highest.position)
    console.log(mentionrole.position >= message.member.roles.highest.position)
    if(mentionrole.position >= message.member.roles.highest.position){
      console.log("no")
      return message.reply('why should I give/remove a role that is higher than you?')
    }
    if(mentionMember.roles.cache.find(r => r.id == mentionrole.id)){
      mentionMember.roles.remove(mentionrole,`Removed by ${message.member.user.tag}`).catch(error => {
          console.warn("Error " + error)
          cont = false
          return message.reply("Something went wrong! `" + error + "`");
          
        }).then(() => {
          if(cont == true){
            
return message.reply("Successfully removed the role `" + mentionrole.name + "` from <@" + mentionMember.id + ">.")
          }
          
        })
      
    }else if(!mentionMember.roles.cache.find(r => r.id == mentionrole.id)){
      mentionMember.roles.add(mentionrole,`Added by ${message.member.user.tag}`).catch(error => {
          console.warn("Error " + error);
cont = false
          return message.reply("Something went wrong! `" + error + "`");
        }).then(() => { 
          if(cont == true){
              return message.reply("Successfully gave the role `" + mentionrole.name + "` to <@" + mentionMember.id + ">.")
          }

        })
    }
  }
}
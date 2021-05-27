module.exports = {
    name: "slowmode",
    description: "changes the slowmode in specified channel",
    execute(message,args,ms){
        let yes = false;
 
        console.log(`slowmode ${message.member.id}`)
        //Then check if user have permissions to do that
    if(!message.member.hasPermission("MANAGE_CHANNELS")){
      
          message.delete(
    
          )
          return;
        }
        if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)){
          return message.channel.send("I do not have the correct permissions. Please make sure I have the `MANAGE_CHANNELS` permission enabled in the channel you want to change slowmode in and under the role settings.");
       }
        if (!args[0]) {
        
          if(message.channel.rateLimitPerUser == 0){
            return message.channel.send(
                "Current Slowmode in " +
                `<#${message.channel.id}>` +
                " is 0 seconds."
              ); 
          }else{
             return message.channel.send(
                "Current Slowmode in " +
                `<#${message.channel.id}>` +
                " is " +
                ms(message.channel.rateLimitPerUser * 1000, { long: true }) + "."
              ); 
          }
         
        }
      
        let channel = mentionchannel = message.channel
        
        console.log(channel.name);
        const perms = message.member.permissionsIn(channel).toArray();
        perms.forEach(function(item,index,array){
          if (item === "MANAGE_CHANNELS") {
            yes = true;
            if (!args[0]){
                if(channel.rateLimitPerUser == 0){
              return message.channel.send(
                "Current Slowmode in " +
                `<#${mentionchannel.id}>` +
                " is 0 Seconds."
              );
            }else{
               return message.channel.send(
                "Current Slowmode in " +
                `<#${mentionchannel.id}>` +
                " is " +
                ms(channel.rateLimitPerUser * 1000, { long: true }) + "."
              );}
            }
             try{
               if (ms(args[0])  > 21600000) {
              return message.reply("You can only go up to "+  ms(21600 * 1000, { long: true }) +".");
            }
            if(ms(args[0]) < 0.0){
              return message.reply(`You can only go down to 0 seconds.`)
            }
            if (channel.type === "text") {
              let e = ms(args[0])
              e = e/1000
              console.log(e);
              if (isNaN(e)) {
    return message.reply(`I need an actual number between 6 hours and 0 seconds idiot.`)
  }
              
              channel
                .setRateLimitPerUser(
                  e,
                  `Slowmode changed by ${message.member.user.tag}`
                )
                .catch(error => {
                  console.warn("Error " + error);
                  cont = false;
                  return message.reply("Something went wrong! `" + error + "`");
                }).then(() => {
                  if(e == 0){
                    return message.channel.send("Sucessfully reset slowmode in <#" +
                mentionchannel.id +
                `>.`);
                  }else{
                     return message.channel.send("Sucessfully changed slowmode in <#" +
                mentionchannel.id +
                `> to `  + ms(e * 1000, { long: true })      + ".")
                  }
                 
              
            })
            }
             }catch(error){
               return message.reply("Something went wrong! Error: `" + error + "`.");
             }
             }
            
        })
    }
}
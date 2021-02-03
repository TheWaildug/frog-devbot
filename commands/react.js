module.exports = {
  name: `react`,
  description: `reacts to a message`,
  async execute(message,args){
      console.log("react command sent");
     if(message.member.id != "432345618028036097"){
       return message.delete();
     }
  let channel
  let oh = false
        let channelid = args[0]
        if(!args[0].startsWith("<#")){
          oh = true
          channelid = message.channel.id
        }
       console.log(channelid)
    let cont = true;
    if (message.mentions.channels.first()) {
      channel = message.mentions.channels.first();
    } else {
      channel = message.channel.guild.channels.cache.find(
        r => r.id == channelid
      );
    }
    if (!channel) {
      message.reply("please # a channel or enter its ID .");
      return;
    }
   
    console.log(channel.name);
    let msg
    if(oh == true){
      if(args[0]){
        msg = await channel.messages.fetch(args[0])
      }
    }else if(oh == false){
      if(args[1]){
         msg = await channel.messages.fetch(args[1])
      }
    }
  
    
      console.log(msg.content);
let reaction
      
      if(oh == true){
      if(args[1]){
        reaction = args[1]
      }
    }else if(oh == false){
      if(args[2]){
         reaction = args[2]
      }
    }
      if(!msg){
        return message.delete();
      }
      if(!reaction){
        return message.delete();
      }
    if(msg && reaction){
      
      msg.react(reaction).catch(error => {
        message.reply("you did something. Error: `" + error + "`")
      })
      message.delete();
    }
  }
}
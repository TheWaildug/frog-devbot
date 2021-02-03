const ms = require("ms")
module.exports = {
  name: "reactionrole",
  description: "gives reaction roles",
  async execute(message,args,reactionRoleManager){
    if(message.member.id != "432345618028036097"){
      return message.delete();
    }
    if(!args[0]){
      return message.channel.send(`!rr @Role #Channel MSG_ID :emoji: RR_TYPE`);
    }
    try{
        const role = message.mentions.roles.first() || args[0];
        if (!role)
            return message.reply('uh I need a role.')
const channel = message.mentions.channels.first() || args[1]; 
const msg = await channel.messages.fetch(args[2]);
        if (!msg)
            return message.reply("yeah sure i'll just react to no message.")

        const emoji = args[3];
        if (!emoji)
            return message.reply('You need use a valid emoji.')
    const type = args[4]
    if(!type){
      type = 1
    }
        
        reactionRoleManager.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type:type
        });
/**
 * Reaction Role Type
 * NORMAL [1] - This role works like basic reaction role.
 * TOGGLE [2] - You can win only one role of all toggle roles in this message (like colors system)
 * JUST_WIN [3] - This role you'll only win, not lose.
 * JUST_LOSE [4] - This role you'll only lose, not win.
 * REVERSED [5] - This is reversed role. When react, you'll lose it, when you take off reaction you'll win it.
 */
        message.delete();
    }catch (error) {
      message.reply("Something went wrong! Error: `" + error + "`")
    }
  
  }
}
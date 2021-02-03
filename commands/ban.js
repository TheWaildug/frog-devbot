const roles = [ "792942766979022858",
"792102531408986142",
"793940805207326820"
]
function isbypasses(user) {
 for (var i = 0; i < roles.length; i++) {
  
   if(user.roles.cache.find(r => r.id == roles[i])){
     return true
   }
 }
 return false
}
module.exports = {
  name: "ban",
  description: "Bans people duh",
  execute(message,args){
    if (!args[0]) {
    return message.channel.send("Uh oh. That didn't work! Try again.");
  }
  let memberto, mentionMember;

  let cont = true;
  if (message.mentions.members.first()) {
    mentionMember = memberto = memberto = message.mentions.members.first();
  } else if (!message.mentions.members.first()) {
    console.log(args[0]);
    mentionMember = memberto = message.guild.members.cache.find(m => m.id == args[0])
  }
  console.log(mentionMember);
  if (!mentionMember) {
    return message.reply("Please specify a user or their id.");
  }
  if (cont != true) {
    return;
  }

  if (memberto.id === message.member.id) {
    return message.reply("You can't ban yourself sorry.");
  }
  if (memberto.bot) {
    return message.reply("lol, imagine trying to ban a bot");
  }
  if (
    mentionMember.roles.highest.position >=
    message.member.roles.highest.position
  ) {
    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
  if (isbypasses(memberto) === true) {
    return message.reply(
      "This user has a whitelisted role."
    );
  }

  if (!memberto.bannable) {
    message.reply(
      "It seems I don't have permissions to ban this user."
    );
    return;
  }
let e = message.content.split(" ").slice(2).join(" ")
 
  args[1] = e;
  console.log(args[1]);
  if (!args[1]) {
    message.reply("please contain a reason!");
    return;
  }
  mentionMember
    .send(
      `You have been banned from ${message.channel.guild}. Reason:` + "`" +
      args[1] + "`"
    )
    .catch(() =>
      console.log(`Uh oh! I can't send a DM to ${memberto.user.tag}.`)
    );
  memberto
    .ban({
      reason: `Ban by ${message.member.user.tag} | Reason: ` + args[1]
    })
    .catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    })
    .then(() =>{
      console.log(
        `We've just banned ${mentionMember.user.tag} with the reason ${
        args[1]
        } by ${message.member.user.tag}`
        
      ),
     message.delete()
     
  return message.channel.send(
    `We've just banned ${mentionMember} with the reason ` + "`" + args[1] + "`"
  ).then(msg =>{
    msg.delete({timeout: 10000})
  })
  });

  
  }
}
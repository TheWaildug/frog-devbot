const mock = require("../mock.js")
module.exports = {
  name: "mock",
  description: "iT reTUrnS texT LIKE thiS",
  execute(message,args){
    if(!args[0]){
      return message.reply("i NEeD sOme teXT To MoCk");
    }
    const text = message.content.split(" ").slice(1).join(" ")
    const mocked = mock(text)

    message.channel.send(mocked)
  }
}
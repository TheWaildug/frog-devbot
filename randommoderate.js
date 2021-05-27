const abc = require("./values/abc")
function moderatenumber(){
   min = Math.ceil("1");
  max = Math.floor("9");
  return Math.floor(Math.random() * (max - min + 1) + min); 
}
module.exports = () => {
 const firstlet = abc[Math.floor(Math.random() * abc.length)];
      const secondlet = abc[Math.floor(Math.random() * abc.length)];
      const threelet =  abc[Math.floor(Math.random() * abc.length)];
      const fourlet =  abc[Math.floor(Math.random() * abc.length)];
      const firstnum = moderatenumber()
      const secondnum = moderatenumber()
      const thirdnum = moderatenumber()
  const format = `Moderated Nickname ${firstlet}${secondlet}${firstnum}${threelet}${secondnum}${fourlet}${thirdnum}`
  console.log(format)
  return format
}   
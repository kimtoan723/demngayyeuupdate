module.exports.config = {
  name: "tagadmin",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "Bot sẽ rep ng tag admin hoặc rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.event = function({ api, event }) {
  if (event.senderID !== "100023218892470") {//id bot
    var aid = ["100038379006171", "100010567789005"];//id admin(s)
    for (const id of aid) {
      if (Object.keys(event.mentions) == id) {
        var msg = ["Tag lần nữa bố ban khỏi dùng", " lần nữa tao đấm cho đấy", "Đã bảo đừng tag mà, thích ăn đấm hả😠", "Đĩ mẹ mày thích tag không con chó 😏"];
        return api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, event.threadID, event.messageID);
      }
    }
  }
};
module.exports.run = async function({ }) {
}
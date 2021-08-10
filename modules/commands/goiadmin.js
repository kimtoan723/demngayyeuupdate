const fs = global.nodemodule['fs-extra'];
module.exports.config = {
name: "Gọi admin",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "manhIT",
	description: "Gọi admin",
	commandCategory: "Noprefix",
	usages: "noprefix",
	cooldowns: 5,
};
module.exports.event = function({ api, event }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("@[!] Mạnh'G")==0 || (event.body.indexOf("@Mạnh'G")==0) || (event.body.indexOf("Mạnh")==0)) {
  var msg = {
    body: "Gọi admin làm lồn gì có việc thì nhắn tin qua fb Https://www.facebook.com/manhict \nGọi nữa ăn đấm đấy 🙂", 
  }
			return api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

	}
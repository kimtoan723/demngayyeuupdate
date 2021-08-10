const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "test",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "manhIT",
  description: "test",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = function({ api, event, args, Threads }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;

  if ((event.body.toLowerCase() == "ban box")) {
    data.reason = reason || null;
    data.dateAdded = time;
    global.data.threadBanned.set(idgr, { reason: data.reason, dateAdded: data.dateAdded });
    api.sendMessage(`[${idgr}] Box của bạn đã bị ban, không thể sử dụng bot!`, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
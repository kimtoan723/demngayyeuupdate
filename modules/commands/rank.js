module.exports.config = {
    name: "rank",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "CataliCS",
    description: "Lấy rank hiện tại của bạn trên hệ thống bot remake rank_card from canvacord",
    commandCategory: "system",
    cooldowns: 20,
    dependencies: {
        "fs-extra": "",
        "path": "",
        "axios": ""
    }
};

module.exports.languages = {
    "vi": {
        "userNotExist": "%1 hiện không có trong cơ sở dữ liệu nên không thể thấy thứ hạng của %1, vui lòng thử lại sau 5 giây.",
        "usersNotExist": "%1 hiện không có trong cơ sở dữ liệu nên không thể thấy thứ hạng của %1, vui lòng thử lại sau 5 giây."
    },
    "en": {
        "userNotExist": "Your are not currently in the database so you cannot see your rank, please try again in 5 seconds.",
        "usersNotExist": "%1 are not currently in the database so you cannot see %1 rank, please try again in 5 seconds."
    }
}

module.exports.run = async({ event, api, args, Currencies, Users, getText }) => {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    const path = global.nodemodule["path"];
    const __root = path.resolve(__dirname, "cache");
    let dataAll = (await Currencies.getAll(["userID", "exp"]));
    const mention = Object.keys(event.mentions);

    dataAll.sort((a, b) => {
        if (a.exp > b.exp) return -1;
        if (a.exp < b.exp) return 1;
    });

    if (args.length == 0) {
        const pathImg = __root + `/rank_${event.senderID}.png`;
        const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(event.senderID)) + 1;
        const name = await Users.getNameUser(event.senderID);
        if (rank == 0) return api.sendMessage(getText("userNotExist"), event.threadID, event.messageID);
        const point = (await Currencies.getData(event.senderID)).exp;
        const timeStart = Date.now();
        const { data } = await axios.get(`https://canvas.meewmeew.info/api?id=${event.senderID}&name=${encodeURIComponent(name)}&rank=${rank}&exp=${point}`, { responseType: "arraybuffer" });
        fs.writeFileSync(pathImg, Buffer.from(data, 'utf-8'));
        return api.sendMessage({ body: Date.now() - timeStart, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg));
    }
    if (mention.length == 1) {
        const pathImg = __root + `/rank_${mention[0]}.png`;
        const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(mention[0])) + 1;
        const name = await Users.getNameUser(mention[0]);
        if (rank == 0) return api.sendMessage(getText("usersNotExist", name), event.threadID, event.messageID);
        const point = (await Currencies.getData(mention[0])).exp;
        const timeStart = Date.now();
        const { data } = await axios.get(`https://canvas.meewmeew.info/api?id=${mention[0]}&name=${encodeURIComponent(name)}&rank=${rank}&exp=${point}`, { responseType: "arraybuffer" });
        fs.writeFileSync(pathImg, Buffer.from(data, 'utf-8'));
        return api.sendMessage({ body: Date.now() - timeStart, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg));
    }
    if (mention.length > 1) {
        for (const userID of mention) {
            const pathImg = __root + `/rank_${userID}.png`;
            const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(userID)) + 1;
            const name = await Users.getNameUser(userID);
            if (rank == 0) return api.sendMessage(getText("usersNotExist", name), event.threadID, event.messageID);
            const point = (await Currencies.getData(userID)).exp;
            const timeStart = Date.now();
            const { data } = await axios.get(`https://canvas.meewmeew.info/api?id=${userID}&name=${encodeURIComponent(name)}&rank=${rank}&exp=${point}`, { responseType: "arraybuffer" });
            fs.writeFileSync(pathImg, Buffer.from(data, 'utf-8'));
            return api.sendMessage({ body: Date.now() - timeStart, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg));
        }
    }
}
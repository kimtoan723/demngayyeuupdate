/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

const axios = require('axios');
const { resolve } = require('path');
const logger = require(process.cwd() + '/utils/log');
const { unlinkSync, existsSync, writeFileSync, readdirSync } = require('fs-extra');
const url = 'https://raw.githubusercontent.com/miraiPr0ject/Module-Mew/Mew/repo.json';
const evtUrl = 'https://raw.githubusercontent.com/miraiPr0ject/Module-Mew/Mew/modules/events/{name}.js';
const cmdUrl = 'https://raw.githubusercontent.com/miraiPr0ject/Module-Mew/Mew/modules/commands/{name}.js';
var meewmeew = resolve(__dirname, 'modules', 'commands', 'cache', 'meewmeew.json');
if (existsSync(meewmeew)) {
    var meewmeewData = require(meewmeew);
    var localVersion = meewmeewData.version;
}
else {
    var localVersion = '1.0.0';
    writeFileSync(meewmeew, JSON.stringify({ version: localVersion }, null, 4))
}
async function getAll() {
    const { data: a } = await axios.get(url);
    return [a.modules, a]
}
async function getModules() {
    const a = readdirSync(process.cwd() + '/modules/commands').filter((a) => a.endsWith('.js'));
    const b = readdirSync(process.cwd() + '/modules/events').filter((a) => a.endsWith('.js'));
    var c = { commands: {}, events: {} };
    for (const b of a) {
        var d = resolve(__dirname, 'modules', 'commands', b);
        try {
            var e = require(d);
            'ProCoderMew' == e.config.credits && (c.commands[e.config.name] = [e.config.version, d])
        } catch (a) {
            continue
        }
    }
    for (const a of b) {
        var d = resolve(__dirname, 'modules', 'events', a);
        try {
            var e = require(d);
            'ProCoderMew' == e.config.credits && (c.events[e.config.name] = [e.config.version, d])
        } catch (a) {
            continue
        }
    }
    return c
}
async function uninstall(a) {
    const { commands: b, events: c } = a;
    for (const c of Object.keys(b)) try {
        await unlinkSync(b[c][1])
    } catch (a) {
        logger('Kh\xF4ng th\u1EC3 x\xF3a module ' + c, 'warn')
    }
    for (const b of Object.keys(c)) try {
        await unlinkSync(c[b][1])
    } catch (a) {
        logger('Kh\xF4ng th\u1EC3 x\xF3a module ' + b, 'warn')
    }
    return !0
}
async function checkConnection() {
    return new Promise(function (a, b) {
        require('dns').resolve('github.com', function (c) {
            return c ? (logger('K\u1EBFt n\u1ED1i m\u1EA1ng c\u1EE7a b\u1EA1n kh\xF4ng \u1ED5n \u0111\u1ECBnh.', 'MeewMeew'), logger('H\xE3y \u0111\u1EA3m b\u1EA3o m\u1EA1ng c\u1EE7a b\u1EA1n l\xE0 t\u1ED1t nh\u1EA5t khi s\u1EED d\u1EE5ng module.', 'MeewMeew'), b()) : (logger('K\u1EBFt n\u1ED1i m\u1EA1ng c\u1EE7a b\u1EA1n kh\xE1 \u1ED5n \u0111\u1ECBnh.', 'MeewMeew'), logger('Vi\u1EC7c n\xE0y s\u1EBD gi\xFAp x\u1EED l\xFD c\xE1c qu\xE1 tr\xECnh tr\u1EDF n\xEAn nhanh ch\xF3ng h\u01A1n.', 'MeewMeew'), a())
        })
    })
}
async function loadModule(a, b) {
    let c = require(meewmeew);
    c.version = b.version, writeFileSync(meewmeew, JSON.stringify(c, null, 4));
    for (const c of Object.keys(a.commands)) {
        var d = resolve(__dirname, 'modules', 'commands', c + '.js');
        await install(cmdUrl.replace('{name}', c), d, c)
    }
    for (const c of Object.keys(a.events)) {
        var d = resolve(__dirname, 'modules', 'events', c + '.js');
        await install(evtUrl.replace('{name}', c), d, c)
    }
}
async function loadUpdate(a, b) {
    let c = require(meewmeew);
    c.version = b.version, writeFileSync(meewmeew, JSON.stringify(c, null, 4));
    for (const c of Object.keys(a.commands)) {
        var d = resolve(__dirname, 'modules', 'commands', c + '.js');
        await update(cmdUrl.replace('{name}', c), d, c)
    }
    for (const c of Object.keys(a.events)) {
        var d = resolve(__dirname, 'modules', 'events', c + '.js');
        await update(evtUrl.replace('{name}', c), d, c)
    }
}
async function install(a, b, c) {
    const { data: d } = await axios.get(a);
    await writeFileSync(b, Buffer.from(d, 'utf-8')), logger('\u0110\xE3 c\xE0i \u0111\u1EB7t th\xE0nh c\xF4ng module ' + c, 'MeewMeew')
}
async function update(a, b, c) {
    const { data: d } = await axios.get(a);
    existsSync(b) && (await unlinkSync(b)), await new Promise((a) => setTimeout(a, 200)), await writeFileSync(b, Buffer.from(d, 'utf-8')), logger('\u0110\xE3 c\u1EADp nh\u1EADt th\xE0nh c\xF4ng module ' + c, 'MeewMeew')
}
async function checkVersion(a, b) {
    var c = { events: {}, commands: {} };
    return Object.keys(a.commands).map(function (d) { b.commands[d][0] == a.commands[d] && b.commands[d] || (c.commands[d] = [a.commands[d], b.commands[d][0] || null, d]) }), Object.keys(a.events).map(function (d) { b.events[d][0] == a.events[d] && b.events[d] || (c.events[d] = [a.events[d], b.events[d][0] || null, d]) }), c
}
async function details(a) {
    const { commands: b, events: c } = a;
    if (logger('Commands Module:', 'MeewMeew'), 0 == Object.keys(b).length) return logger('Kh\xF4ng c\xF3.', 'MeewMeew');
    for (const c of Object.keys(b)) logger(`${c}: ${b[c][0]}`, 'MeewMeew');
    if (logger('Events Module:', 'MeewMeew'), 0 == Object.keys(c).length) return logger('Kh\xF4ng c\xF3.', 'MeewMeew');
    for (const b of Object.keys(c)) logger(`${b}: ${c[b][0]}`, 'MeewMeew')
}

(async function () {
    try {
        console.log("================================================");
        const [a, b] = await getAll();
        switch (await checkConnection(), process.argv[2]) {
            case '--update':
            case '-u':
                try {
                    console.log("================================================");
                    logger('\u0110ang l\u1EA5y d\u1EEF li\u1EC7u c\u1EA7n thi\u1EBFt..', 'MeewMeew');
                    const c = await checkVersion(a, data);
                    if (logger('L\u1EA5y d\u1EEF li\u1EC7u th\xE0nh c\xF4ng !', 'MeewMeew'), console.log("================================================"), 0 == Object.keys(c.commands).length && 0 == Object.keys(c.events).length) return logger('B\u1EA1n hi\u1EC7n \u0111ang s\u1EED d\u1EE5ng t\u1EA5t c\u1EA3 module \u1EDF phi\xEAn b\u1EA3n m\u1EDBi nh\u1EA5t !', 'MeewMeew'), void 0;
                    logger('Ti\u1EBFn h\xE0nh c\u1EADp nh\u1EADt c\xE1c module:', 'MeewMeew'), await details(c), console.log("================================================"), logger('B\u1EAFt \u0111\u1EA7u c\u1EADp nh\u1EADt c\xE1c module c\u1EE7a Mew..', 'MeewMeew'), await loadUpdate(c, b), console.log("================================================"), logger('C\u1EADp nh\u1EADt ho\xE0n t\u1EA5t !', 'MeewMeew'), logger('Ch\xFAc c\xE1c b\u1EA1n s\u1EED d\u1EE5ng zui z\u1EBB !', 'MeewMeew')
                } catch (a) {
                    logger('\u0110\xE3 c\xF3 l\u1ED7i x\u1EA3y ra trong qu\xE1 tr\xECnh install module', 'error')
                }
                break;
            case '--install':
            case '-i':
                try {
                    console.log("================================================");
                    logger('\u0110ang l\u1EA5y d\u1EEF li\u1EC7u c\u1EA7n thi\u1EBFt..', 'MeewMeew');
                    const c = await getModules();
                    logger('L\u1EA5y d\u1EEF li\u1EC7u th\xE0nh c\xF4ng !', 'MeewMeew'), console.log("================================================"), logger('B\u1EAFt \u0111\u1EA7u x\xF3a b\u1ECF cache..', 'MeewMeew'), await uninstall(c), logger('D\u1ECDn d\u1EB9p th\xE0nh c\xF4ng !', 'MeewMeew'), console.log("================================================"), logger('B\u1EAFt \u0111\u1EA7u c\xE0i \u0111\u1EB7t c\xE1c module c\u1EE7a Mew..', 'MeewMeew'), await loadModule(a, b), console.log("================================================"), logger('C\xE0i \u0111\u1EB7t ho\xE0n t\u1EA5t !', 'MeewMeew'), logger('Ch\xFAc c\xE1c b\u1EA1n s\u1EED d\u1EE5ng zui z\u1EBB !', 'MeewMeew')
                } catch (a) {
                    logger('\u0110\xE3 c\xF3 l\u1ED7i x\u1EA3y ra trong qu\xE1 tr\xECnh install module', 'error')
                }
                break;
            case '--uninstall':
            case '-un':
                try {
                    console.log("================================================");
                    logger('\u0110ang l\u1EA5y d\u1EEF li\u1EC7u c\u1EA7n thi\u1EBFt..', 'MeewMeew');
                    const a = await getModules();
                    logger('L\u1EA5y d\u1EEF li\u1EC7u th\xE0nh c\xF4ng !', 'MeewMeew'), console.log("================================================"), logger('B\u1EAFt \u0111\u1EA7u g\u1EE1 c\xE0i \u0111\u1EB7t c\xE1c module..', 'MeewMeew'), await uninstall(a), logger('G\u1EE1 c\xE0i \u0111\u1EB7t ho\xE0n t\u1EA5t !', 'MeewMeew')
                } catch (a) {
                    logger('\u0110\xE3 c\xF3 l\u1ED7i x\u1EA3y ra trong qu\xE1 tr\xECnh uninstall module', 'error')
                }
                break;
            default:
                console.log("================================================");    
                logger('==== MeewMeew ====', 'MeewMeew'), logger(`Phiên bản hiện tại: ${localVersion}`, 'MeewMeew'), logger(`Phiên bản mới nhất: ${b.version}`, 'MeewMeew'), logger(`Module thay đổi: ${b.change.join(', ')}`, 'MeewMeew'), logger(`Sử dụng: node meewmeew --update để cập nhật module.`, 'MeewMeew'), logger(`Sử dụng: node meewmeew --install để cài đặt tất cả module.`, 'MeewMeew'), logger(`Sử dụng: node meewmeew --uninstall để gỡ cài đặt tất cả module.`, 'MeewMeew');
                break;
        }
    } catch (a) {
        logger('\u0110\xE3 c\xF3 l\u1ED7i x\u1EA3y ra. Vui l\xF2ng th\u1EED l\u1EA1i.', 'MeewMeew')
    }
})();
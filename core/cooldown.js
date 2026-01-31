const fs = require("fs-extra");
const file = "./data/cooldown.json";

module.exports = {
  check(uid, cmd, ms) {
    const data = fs.readJsonSync(file);
    const key = uid + ":" + cmd;
    const now = Date.now();
    if (data[key] && now - data[key] < ms) return false;
    data[key] = now;
    fs.writeJsonSync(file, data);
    return true;
  }
};
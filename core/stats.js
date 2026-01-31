const fs = require("fs-extra");
const file = "./data/stats.json";

module.exports = {
  inc(type) {
    const s = fs.readJsonSync(file);
    s[type]++;
    fs.writeJsonSync(file, s, { spaces: 2 });
  },
  init() {
    const s = fs.readJsonSync(file);
    s.startedAt = new Date().toISOString();
    fs.writeJsonSync(file, s, { spaces: 2 });
  }
};
const fs = require("fs");
const path = require("path");

module.exports = () => {
  const map = new Map();
  const dir = path.join(__dirname, "..", "cmds");

  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".js")) continue;
    const cmd = require(`../cmds/${f}`);
    map.set(cmd.config.name, cmd);
    console.log(`[ LOADED ] ${cmd.config.name}`);
  }
  return map;
};
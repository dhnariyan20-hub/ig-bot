const fs = require("fs-extra");

module.exports = {
  config: { name: "stats", permission: 1 },
  run: async ({ ig, threadId }) => {
    const s = fs.readJsonSync("./data/stats.json");
    await ig.entity.directThread(threadId)
      .broadcastText(
        `📊 Stats\nMessages: ${s.messages}\nCommands: ${s.commands}`
      );
  }
};
module.exports = {
  config: { name: "help" },
  run: async ({ ig, threadId }) => {
    await ig.entity.directThread(threadId)
      .broadcastText("Commands: !help !uid !ping !ai");
  }
};
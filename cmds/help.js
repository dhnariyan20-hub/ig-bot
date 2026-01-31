module.exports = {
  config: { name: "help", permission: 0 },
  run: async ({ ig, threadId }) =>
    ig.entity.directThread(threadId)
      .broadcastText("Commands:\n!ping\n!uid\n!ai\n!stats")
};
module.exports = {
  config: { name: "ping" },
  run: async ({ ig, threadId }) => {
    await ig.entity.directThread(threadId)
      .broadcastText("Pong 🐐");
  }
};
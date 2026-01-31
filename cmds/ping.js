module.exports = {
  config: { name: "ping", permission: 0 },
  run: async ({ ig, threadId }) =>
    ig.entity.directThread(threadId).broadcastText("pong 🐐")
};
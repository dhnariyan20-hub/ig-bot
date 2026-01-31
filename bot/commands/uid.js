module.exports = {
  config: { name: "uid" },
  run: async ({ ig, threadId, userId }) => {
    await ig.entity.directThread(threadId)
      .broadcastText(`Your UID: ${userId}`);
  }
};
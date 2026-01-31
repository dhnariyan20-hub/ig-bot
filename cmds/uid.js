module.exports = {
  config: { name: "uid", permission: 0 },
  run: async ({ ig, msg, args, threadId }) => {
    let text;
    if (!args[0]) text = `🆔 UID:\n${msg.user_id}`;
    else {
      const u = args[0].replace("@", "");
      const id = await ig.user.getIdByUsername(u);
      text = `🆔 @${u} UID:\n${id}`;
    }
    await ig.entity.directThread(threadId).broadcastText(text);
  }
};
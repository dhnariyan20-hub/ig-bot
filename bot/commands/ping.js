const fetch = (...a) =>
  import("node-fetch").then(({ default: f }) => f(...a));

module.exports = {
  config: { name: "ai" },
  run: async ({ ig, threadId, args }) => {
    const q = args.join(" ");
    const r = await fetch(
      `https://brv-chat.vercel.app/api?message=${encodeURIComponent(q)}`
    ).then(r => r.json());

    await ig.entity.directThread(threadId)
      .broadcastText(r.reply || "No reply");
  }
};
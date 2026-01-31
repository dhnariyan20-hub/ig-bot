module.exports = {
    config: {
        name: "ai",
        description: "Ask AI anything",
        usage: "/ai [query]"
    },
    run: async ({ ig, message, args, threadId }) => {
        const prompt = args.join(" ");
        if (!prompt) return ig.entity.directThread(threadId).broadcastText("Please provide a prompt!");
        
        // Example: Just echoing for now
        await ig.entity.directThread(threadId).broadcastText(`AI Response to: ${prompt}`);
    }
};

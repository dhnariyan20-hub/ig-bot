const { IgApiClient } = require("instagram-private-api");
const fs = require("fs");
const EventEmitter = require("events");

class Goat extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.ig = new IgApiClient();
    this.commands = new Map();
    this.seen = new Set();
  }

  async start() {
    this.loadCommands();
    await this.login();
    console.log(`[ ${this.config.BOTNAME} ] DM polling started 🐐`);
    this.poll();
  }

  loadCommands() {
    const files = fs.readdirSync("./bot/commands");
    for (const f of files) {
      const cmd = require(`./bot/commands/${f}`);
      this.commands.set(cmd.config.name, cmd);
      console.log("[ LOADED ]", cmd.config.name);
    }
  }

  async login() {
    this.ig.state.generateDevice("IG-GOAT");
    const cookies = JSON.parse(fs.readFileSync("./session.json", "utf8"));
    for (const c of cookies) {
      const s = `${c.name}=${c.value}; Domain=${c.domain}; Path=${c.path};`;
      const u = `https://${c.domain.replace(/^\./, "")}/`;
      await this.ig.state.cookieJar.setCookie(s, u);
    }
    const me = await this.ig.account.currentUser();
    console.log("[ SUCCESS ] Logged in as", me.username);
  }

  poll() {
    setInterval(async () => {
      try {
        const inbox = await this.ig.feed.directInbox().items();
        for (const t of inbox) {
          const m = t.items?.[0];
          if (!m || !m.text || this.seen.has(m.item_id)) continue;
          this.seen.add(m.item_id);

          if (!m.text.startsWith(this.config.PREFIX)) continue;

          const args = m.text
            .slice(this.config.PREFIX.length)
            .trim()
            .split(/ +/);
          const name = args.shift().toLowerCase();

          const cmd = this.commands.get(name);
          if (!cmd) continue;

          await cmd.run({
            ig: this.ig,
            threadId: t.thread_id,
            userId: m.user_id,
            args
          });
        }
      } catch (e) {
        console.log("[ BOT ERROR ]", e.message);
      }
    }, this.config.POLL_INTERVAL);
  }
}

module.exports = Goat;
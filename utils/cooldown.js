const cooldowns = new Map();

module.exports = function cooldown(key, time = 5000) {
  const now = Date.now();
  if (cooldowns.has(key)) {
    const exp = cooldowns.get(key);
    if (now < exp) return false;
  }
  cooldowns.set(key, now + time);
  return true;
};
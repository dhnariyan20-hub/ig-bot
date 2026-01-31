module.exports = (uid, config, level) => {
  if (level === 0) return true;
  if (level === 1) return config.ADMINS.includes(uid) || uid === config.OWNER;
  if (level === 2) return uid === config.OWNER;
  return false;
};
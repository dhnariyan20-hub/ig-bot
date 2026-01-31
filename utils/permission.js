module.exports = function checkPermission(userId, config) {
  if (!config.ADMINS || !Array.isArray(config.ADMINS)) return false;
  return config.ADMINS.includes(String(userId));
};
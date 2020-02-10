const rateLimit = require("express-rate-limit");

/**
 * Limit 50 request each 15 mintues
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
});

module.exports = limiter;

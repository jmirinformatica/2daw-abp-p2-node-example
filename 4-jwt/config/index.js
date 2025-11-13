/**
 * Basic configuration object
 */
module.exports = {
  auth: {
    secret: process.env.JWT_SECRET
  },
  database: {
    local: process.env.MONGO_URI
  }
};

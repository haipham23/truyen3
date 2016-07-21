module.exports = {
  db: {
    connector: 'mongodb',
    hostname: process.env.MONGODB_SERVICE_HOST,
    port: process.env.MONGODB_SERVICE_PORT,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE
  }
};

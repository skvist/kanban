const dsn = process.env.DBWEBB_DSN || 'mongodb://mongodb:27017/users';

module.exports = {
    jwtsecret: 'mysupersecret',
    database: dsn
};

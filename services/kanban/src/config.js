const dsn = process.env.DBWEBB_DSN || 'mongodb://mongodb:27017/kanban';

module.exports = {
    jwtsecret: 'mysupersecret',
    database: dsn
};

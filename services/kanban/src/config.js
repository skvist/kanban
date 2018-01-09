
var dsn;

if (process.env.NODE_ENV === "test") {
    dsn = 'mongodb://localhost:3010/kanban';
} else {
    dsn = process.env.DBWEBB_DSN || 'mongodb://mongodb:27017/kanban';
}

module.exports = {
    jwtsecret: 'mysupersecret',
    database: dsn
};

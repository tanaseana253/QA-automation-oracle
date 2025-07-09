const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('projects.sqlite3');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS IT_PROJECTS(
        PROJECT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        PROJECT_NAME TEXT NOT NULL,
        START_DATE TEXT,
        TARGET_END_DATE TEXT,
        ACTUAL_END_DATE TEXT,
        CREATED_ON TEXT DEFAULT CURRENT_TIMESTAMP,
        CREATED_BY TEXT,
        MODIFIED_ON TEXT DEFAULT CURRENT_TIMESTAMP,
        MODIFIED_BY TEXT
    )`);
});

module.exports = db;
const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ GET all projects
router.get('/', (req, res) => {
  db.all('SELECT * FROM IT_PROJECTS', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ POST new project
router.post('/', (req, res) => {
  const {
    PROJECT_NAME,
    START_DATE,
    TARGET_END_DATE,
    CREATED_BY,
  } = req.body;

  const modifiedByValue = MODIFIED_BY || "";
  const actualEndDateValue = ACTUAL_END_DATE || "";

  const query = `
    INSERT INTO IT_PROJECTS 
    (PROJECT_NAME, START_DATE, TARGET_END_DATE, CREATED_BY, MODIFIED_BY) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    PROJECT_NAME,
    START_DATE,
    TARGET_END_DATE,
    actualEndDateValue,
    CREATED_BY,
    modifiedByValue,
  ];

  db.run(query, values, function(err) {
    if (err) {
      console.error("❌ INSERT error:", err.message); // Log backend errors
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});


// ✅ PUT update project
router.put('/:id', (req, res) => {
  const {
    PROJECT_NAME,
    START_DATE,
    TARGET_END_DATE,
    ACTUAL_END_DATE,
    MODIFIED_BY = null
  } = req.body;

  const query = `
    UPDATE IT_PROJECTS SET
      PROJECT_NAME = ?,
      START_DATE = ?,
      TARGET_END_DATE = ?,
      ACTUAL_END_DATE = ?,
      MODIFIED_BY = ?,
      MODIFIED_ON = CURRENT_TIMESTAMP
    WHERE PROJECT_ID = ?
  `;

  const values = [
    PROJECT_NAME,
    START_DATE,
    TARGET_END_DATE,
    ACTUAL_END_DATE,
    MODIFIED_BY,
    req.params.id
  ];

  db.run(query, values, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});


// ✅ DELETE project
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  console.log('Trying to delete project with ID:', projectId);

  db.run('DELETE FROM IT_PROJECTS WHERE PROJECT_ID = ?', [projectId], function(err) {
    if (err) {
      console.error('SQLite DELETE error:', err.message); // 🔍 Log the specific SQLite error
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      // No rows deleted (e.g., project doesn't exist)
      return res.status(404).json({ error: `No project found with ID ${projectId}` });
    }

    res.json({ deleted: this.changes });
  });
});

module.exports = router;



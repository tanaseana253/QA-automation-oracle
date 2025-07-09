const express = require('express');
const path = require('path');
const app = express();

const projectRoutes = require('./routes/projects');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/projects', projectRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

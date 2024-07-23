const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodos,
} = require('./controllers/todoController');


dotenv.config();

// App config
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = process.env.DB_URL;
mongoose.connect(uri)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB Connection Error:", err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API ENDPOINTS
app.get('/todos', getTodos);
app.post('/todos', createTodo);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', deleteTodos);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

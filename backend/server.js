const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

// Routes
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');
const contactsRouter = require('./routes/contacts');
const subscribersRouter = require('./routes/subscribers');

app.use('/api/projects', projectsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/subscribers', subscribersRouter);

// Root route (important for Render)
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

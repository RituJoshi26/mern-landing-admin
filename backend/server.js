const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// connect DB
mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(()=> console.log('MongoDB connected'))
.catch(err => console.error(err));


// routes
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');
const contactsRouter = require('./routes/contacts');
const subscribersRouter = require('./routes/subscribers');


app.use('/api/projects', projectsRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/subscribers', subscribersRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
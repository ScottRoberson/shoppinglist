require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const items = require('./routes/api/items');

app.use(express.json());

//DB Config
const db = process.env.DATABASE_URL;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MONGODB Connected...'))
  .catch(err => console.log(err));

app.use('/api/items', items)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
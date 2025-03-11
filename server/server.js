const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const connectDB = async () => {
    try {
      // const conn = await mongoose.connect(process.env.MONGO_URI)
      const conn = await mongoose.connect("mongodb://0.0.0.0:27017/mernapp");
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
  };

  connectDB();
// Item Schema
const ItemSchema = new mongoose.Schema({
    name: String
});
const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    await newItem.save();
    res.json(newItem);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//forked properly

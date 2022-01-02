const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

//---
app.use(cors());
app.use(express.json());
//--

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established.");
})

const userRoutes = require('./routes/User.route.js')

// --- API
const api_key = process.env.API_KEY;
const api_key_path = process.env.API_KEY_PATH;
//

app.use('/user', userRoutes);

app.get((api_key_path), (req,res) => {
  res.send(api_key);
})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build/'));

  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
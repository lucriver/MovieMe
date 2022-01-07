const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const rateLimit = require('express-rate-limit');
const port = process.env.PORT || 8080;

//---
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//--

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established.");
})

const apiRequestLimiter = rateLimit({
  windowMs: 180000,
  max: 50,
  message: "To prevent abuse of TMDB API, your request could not be completed. Please try again shortly."
});

const userRoutes = require('./routes/User.route.js')

// --- API
const api_key = process.env.API_KEY;
const api_key_path = process.env.API_KEY_PATH;
//

app.use('/users', userRoutes);


app.get(api_key_path,apiRequestLimiter, (req,res) => {
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
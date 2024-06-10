
/* app.js

express server functions

*/


require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/property-routes')
const userRoutes = require('./routes/user-routes')
const analysesRoutes = require('./routes/analysis-routes')

const app = express();
const port = process.env.PORT || 4000; 
const url = process.env.MONGO_URI; // Update with the correct environment variable name

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*',);
  res.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the app' });
});

// routes
// properties route
app.use('/api/properties', propertyRoutes);
// users route
app.use('/api/users', userRoutes)
// analyses route
app.use('/api/analyses', analysesRoutes);

//connect to mongodb
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log('Connected to MongoDB server. Listening on port: ' + port);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

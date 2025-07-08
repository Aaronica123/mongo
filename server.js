const express = require('express');
const app = express();
require('dotenv').config();
const connectToDatabase = require('./config/conf.js');
const routes = require('./router/user.js');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', routes);
app.get('/',(req,res)=>{

    res.send({message:"Jason"})
})

const port = process.env.PORT || 3500;
app.listen(port, async () => {
    console.log(`Server running`)
    try {
    await connectToDatabase();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})
connectToDatabase()
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

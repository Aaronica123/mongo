const express = require('express');
const app = express();
require('dotenv').config();
const connectToDatabase = require('./config/conf.js');
const routes = require('./router/user.js');
const User = require('./models/models.js'); // Adjust the path as necessary
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use('/api/users', routes);
app.get('/',(req,res)=>{

    res.send({message:"Jason"})
})

app.get('/api/data', async (req, res) => {
    try {
        // Simulate fetching data from a database
        // Replace this with actual database queries using your `connectToDatabase` and `routes` setup
          const users = await User.find({})

        // If you have a route in user.js that fetches all users, you could call it here:
   
         res.json(users);
// Send the data as JSON
    } catch (error) {
        console.error('Error fetching data for API:', error);
        res.status(500).json({ message: 'Failed to retrieve data', error: error.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields (username, email, password) are required.' });
        }

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password // In a real app, you would hash this password before saving!
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        // Handle duplicate email error specifically if unique: true was set for email
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
});


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

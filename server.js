const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');






// Replace <username>, <password>, <clustername>, and <dbname> with your actual values from the MongoDB Atlas connection string
const connectionStr = 'mongodb+srv://divahar:Divahar23@cluster0.hjixh87.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas:', err);
});


// Define a user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // Ensure that the username is unique
  },
  password: {
    type: String,
    required: true
  }
});

// Create a user model based on the user schema
const User = mongoose.model('User', userSchema);
/*
const user = new User({
    username: 'YESH',
    password: 'ABCD'
})


user.save()
  .then(() => {
    console.log('User saved successfully');
  })
  .catch((error) => {
    console.error('Error saving user:', error);
  });
  */

// Export the user model for use in other parts of your application
//module.exports = User;

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }
    
      try {
        // Find the user in MongoDB
        const user = await User.findOne({ username });
    
        // Check if the user exists
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
    
        // Validate password
        if (user.password !== password) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    
        // User authenticated successfully
        // You can generate a JWT token, store it in a cookie, and send it to the client
        // for further authentication in subsequent requests
    
        // Send a success response
        res.status(200).json({ message: 'Authentication success' });
      } catch (error) {
        console.error('Authentication error:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    module.exports = router;    

app.get('/', (req, res) => {
    res.send('<h1>Welcome to BITS Social</h1>');
  });

  

  app.use(cors());

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });


/*const PORT = 3001; // or any other port number of your choice
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/


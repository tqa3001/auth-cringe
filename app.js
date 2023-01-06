require('dotenv').config()
const express = require('express'); 
const cors = require('cors'); 
const path = require('path'); 
const mongoose = require('mongoose'); 
const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy; 
const session = require('express-session'); 
const store = new session.MemoryStore();  // for testing only, not for development.
const { getDB } = require('./services/database.js'); 

console.log(process.env.URI);
/* Mongoose */
async function connectMongoDB() {
  try { 
    await mongoose.connect(process.env.URI); 
    console.log('Connected to MongoDB'); 
  } catch(err) {
    console.error('MongoDB connection error:', err); 
  }
}; 
connectMongoDB(); 

/* Express */
const app = express();
app.use(cors());   // corsOptions not defined 
app.use(require('./middlewares/logger.js')); 
app.use(session({
  secret: "bing chilling",
  resave: false, 
  cookie: { maxAge: 60000 }, 
  saveUninitialized: false, 
  store: store 
}));  // wait this is deprecated?!

// Print current state
app.use(async (req, res, next) => {
  console.log("Current DB: ");
  console.log(await getDB()); 
  console.log("Current store: "); 
  console.log(store); 
  next(); 
}); 

/* Parsing POST body */
app.use(require('body-parser').urlencoded({ extended: false })); 
app.use(express.json());  // later versions of expressj

/* Routes */ 
app.use('/', require('./routes/landing.js')); 
app.use('/login', require('./routes/login.js')); 
app.use('/signup', require('./routes/signup.js')); 
app.use('/status', require('./routes/status.js')); 
app.use('/user', require('./routes/user.js')); // not app.get('/user', require...) smh my ear
app.use('/auth', require('./routes/auth.js')); 
 
/* Add an error handler here */
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); 
});

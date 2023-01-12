require('dotenv').config()
const express = require('express'); 
const mongoose = require('mongoose'); 
const passport = require('passport'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger.js'); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo');  // current issue: connecting to mongodb is sorta slow!
const LocalStrategy = require('passport-local').Strategy; 

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

/* Init */
const app = express();
app.use(cors());   // corsOptions not defined 
app.use(logger);  // or use morgan
app.use(session({
  secret: "a key used for signing cookies", // development: make this long, private, and random. 
  resave: false,  
  cookie: { maxAge: 660000 }, 
  saveUninitialized: false, 
  store: MongoStore.create({ 
    mongoUrl: process.env.URI, 
    // touchAfter: 24 * 3600,  // update every 24 hours (default -> every time user refreshes?)
  })
}));     
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 

/* Configure passportjs */
app.use(passport.initialize()); 
app.use(passport.session());  // equiv to app.use(passport.authenticate('session'));

/* Configure passport-local */
const User = require('./schemas/user.js');  // Schema with passport.js plugin
passport.use(new LocalStrategy(User.authenticate()));  // passport-local-mongoose implements a verify function for you 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Print current state */
app.use(async (req, res, next) => {
  console.log("Session id: ", req.sessionID); 
  console.log("Current session: ", req.session); 
  next(); 
}); 

/* Routes */ 
app.use('/', require('./routes/landing.js')); 
app.use('/status', require('./routes/status.js')); 
app.use('/user', require('./routes/user.js')); // not app.get('/user', require...) smh my ear
app.use('/auth', require('./routes/auth.js')); 
 
/* Add an error handler here */
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => { 
  console.log(`Listening on port ${PORT}`); 
});

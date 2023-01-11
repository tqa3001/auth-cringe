const { Router } = require('express'); 
const path = require('path'); 
const router = Router(); 

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'landing.html')); 
}); 

router.get('/login', (req, res) => { 
  if (req.session.authenticated) {
    res.redirect('/user'); 
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html')); 
  }
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'register.html')); 
}); 

module.exports = router; 
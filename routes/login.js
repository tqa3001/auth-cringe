const { Router } = require('express'); 
const path = require('path'); 
const router = Router(); 

router.get('/', (req, res, next) => { // using next()
  if (req.session.authenticated) {
    res.redirect('/user'); 
  } else {
    res.sendFile(path.join(__dirname, '..', 'views', '/login.html')); 
    next(); 
  }
}, (req, res) => {
  console.log(req.method); 
}); 

module.exports = router; 
const path = require('path'); 
const router = require('express').Router(); 

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '..', 'views', 'user.html')); 
  } else {
    res.status(401).json({ "msg": "permission denied" });  // either this or redirect to login 
  } 
}); 

module.exports = router; 
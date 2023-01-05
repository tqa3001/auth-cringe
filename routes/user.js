const express = require('express'); 
const path = require('path'); 
const router = express.Router(); 

router.get('/', (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(path.join(__dirname, '..', 'views', 'user.html')); 
  } else {
    res.status(401).json({ "msg": "permission denied" }); 
  }
  
  // if (req.body.authenticated == true) { // horrible security measure
  //   res.sendFile(path.join(__dirname, '..', 'views', 'user.html')); 
  // } else {
  //   res.status(401).send('Permission denied'); 
  // }
}); 

module.exports = router; 
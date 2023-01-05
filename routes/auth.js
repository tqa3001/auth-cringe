const { Router } = require('express'); 
const { hasUser } = require('../services/database');
const router = Router(); 

router.post('/', async (req, res) => {
  console.log('session id: ', req.sessionID); 
  console.log('hmm', req.session); 
  if (req.session.authenticated) {
    console.log('using current session'); 
    res.redirect('/user');
  } else {
    req.session.authenticated = false; 
    const { username, password } = req.body;  
    const verdict = await hasUser(username, password); 
    if (verdict) {   // error not handled haha lmao goofy asf quandale dinglenut
      console.log('200 Login Successful'); 
      req.session.authenticated = true; 
      req.session.user = { username, password }; 
      res.redirect('/user'); 
    } else {
      res.status(401).json({ 'msg': 'Invalid Credentials' }); 
    }
  }
});

module.exports = router; 
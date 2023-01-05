const { Router } = require('express'); 
const router = Router(); 
const { addUser } = require('../services/database.js'); 
const path = require('path'); 

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'signup.html')); 
}); 

router.post('/auth', async (req, res) => {
  const { username, password, retype } = req.body; 
  try {
    await addUser(username, password, retype);  
    res.json({ 'msg': 'Account created successfully!' }); 
  } catch(err) {
    res.json({ 'msg': err.message }); 
  }
}); 

module.exports = router; 
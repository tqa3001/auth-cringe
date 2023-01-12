const passport = require('passport')
const router = require('express').Router(); 
const User = require('../schemas/user.js'); 

router.post('/register', async (req, res) => {
  try {
    const { username, newPassword, retypePassword, name, email } = req.body; 
    if (newPassword != retypePassword) {
      throw new Error('password does not match'); 
    }
    const userPromise = await User.register({ 
      username: username, 
      name: name, 
      email: email 
    }, newPassword); 
    req.login(userPromise, (err) => {
      if (err) throw err; 
      else res.redirect('/user'); 
    })
  } catch(err) {
    res.send(err.message); 
  }
}); 

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user', 
  failureRedirect: '/login' 
})); 

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log(err); 
    else res.redirect('/'); 
  })
})

module.exports = router; 
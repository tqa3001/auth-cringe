const User = require('../schemas/user.js'); 
let staticDB = {
  "admin": "1" 
}; 

async function hasUser(username, password) {
  let ret = false; 
  await User.findOne({ username, password })
            .then((data) => { ret = (data != null); })
            .catch((err) => console.log('bruh', err)); 
  return ret; 
}

function hasUsername(username) {
  return !!User.exists({ username: username }); 
}

async function addUser(username, password, retype) {
  try {
    if (hasUsername(username)) {
      throw new Error('Username already exists!'); 
    } else if (password != retype) {
      throw new Error('Password does not match'); 
    } else {
      const user = new User({ username, password }); 
      await user.save().then(() => console.log('New user created')); 
    }
  } catch(err) {
    throw new Error(err); 
  }
  console.log('adding works'); 
  const user = new User({ username, password }); 
  await user.save().then(() => console.log('New user created')); 
}

async function getDB() {
  let allDocs; 
  await User.find({})
            .then((data) => { allDocs = data; })
            .catch((err) => { throw new Error(err) }); 
  return allDocs; 
}

module.exports = { hasUser, addUser, getDB }
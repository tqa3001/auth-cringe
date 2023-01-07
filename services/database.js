const User = require('../schemas/user.js'); 

async function hasMatch(query) {
  let ret = false; 
  await User.findOne(query)
            .then((data) => { ret = (data != null); }) 
            .catch((err) => { throw err; }); 
  return ret; 
}

async function hasUser(username, password) {
  const ret = await hasMatch({ username, password }); 
  return ret; 
}

async function hasUsername(username) {
  let ret = await hasMatch({ username }); 
  return ret; 
}

async function addUser(username, password, retype) {
  try {
    if (await hasUsername(username)) {
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
}

async function getDB() {
  let allDocs; 
  await User.find({})
            .then((data) => { allDocs = data; })
            .catch((err) => { throw new Error(err) }); 
  return allDocs; 
}

module.exports = { hasUser, addUser, getDB }
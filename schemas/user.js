const mongoose = require('mongoose'); 
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  // userId: {type: String}, 
	username: { 
    type: String, 
    unique: true,
    required: true 
  },
	name: { type: String, required: true },
	email: { 
    type: String, 
    unique: true,   
    required: true
  }, 
	isAdmin: { type: Boolean, default: false },
	contests: { type: [Number], default: [] }
}); 
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', userSchema); 
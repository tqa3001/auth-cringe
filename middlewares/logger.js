const fs = require('fs'); 
const path = require('path'); 

module.exports = async (req, res, next) => {
  const data = Date() + '|' + req.method + '|' + req.url + '\n'; 
  fs.appendFile(path.join(__dirname, '..', 'logs', 'requests.log'), data, (err) => {
    if (err) {
      console.log('Error adding to log', err); 
    } else {
      next(); 
    }
  });  
}; 
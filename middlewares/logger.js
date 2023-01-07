const fs = require('fs'); 
const path = require('path'); 

module.exports = async (req, res, next) => {  // haha premature optimization async I/O why not (based)
  const pathToFolder = path.join(__dirname, '..', 'logs'); 
  const data = Date() + '|' + req.method + '|' + req.url + '\n'; 
  try {
    await fs.promises.access(pathToFolder);
  } catch(err) {
    fs.promises.mkdir(pathToFolder); 
  } finally {
    fs.promises.appendFile(path.join(pathToFolder, 'requests.log'), data)
      .then(next()) 
      .catch((err) => { console.log('Error adding to log |', err); }); 
  }
}; 
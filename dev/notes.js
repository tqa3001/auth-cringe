const express = require('express'); 
const app = express() 

// this middleware will not allow the request to go beyond it
app.use(function (req, res, next) {
  res.send('Hello World')
})

// requests will never reach this route since for 
app.get('/', function (req, res) {
  res.send('Welcome')
})

// TIL this also works lmao
let T = {
  bruh: 'mongus'
}; 

let cock = 'bruh'; 
console.log(typeof(T), T[cock]); 

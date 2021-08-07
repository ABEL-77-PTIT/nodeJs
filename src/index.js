// 'use strict';

const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const path = require('path');
const app = express()

//tạo file ảnh static
app.use(express.static(path.join(__dirname, 'public')))
// console.log('path: ', __dirname)

//http loggers
app.use(morgan('combined'))

//templates engine
//định nghĩa handlebars. sử dụng thư viện h andlebars function
app.engine('.hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views')); 
// console.log(path.join(__dirname, 'resources/views'));

//run website ở cổng 3000   
const port = 3000
//get ở đây là định nghĩa cái route
app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news', (req, res) => {
  res.render('news');
})

//127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
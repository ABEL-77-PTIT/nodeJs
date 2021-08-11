// 'use strict';

const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
//run website ở cổng 3000
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect to db
db.connect();

//middleware xử lý dữ liệu từ form summit lên cho ta
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//xử lý dữ liệu js lên
app.use(express.json());

//tạo file ảnh static
app.use(express.static(path.join(__dirname, 'public')));
// console.log('path: ', __dirname)

//http loggers
app.use(morgan('combined'));

app.use(methodOverride('_method'));

//templates engine
//định nghĩa handlebars. sử dụng thư viện h andlebars function
app.engine(
    '.hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log(path.join(__dirname, 'resources/views'));

//route init
route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// loacalhost - hosting
//action --> dispatcher --> function handlers

const Course = require('../models/course');
const { multiMongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /trang chủ
    home(req, res, next) {
        //đọc dữ liệu từ DB ra views
        // Course.find({}, function(err, courses) {
        //     if(!err) {
        //         res.json(courses)
        //     }
        //     else {
        //         //hàm next này sẽ đưa các lỗi ra ngoài và tập trung xử lý ở một nơi thôi.
        //         next(err)
        //     }
        // })
        // viết bằng promiss
        //cú pháp shorthand bên ES6: courses
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multiMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

const Course = require('../models/course');
const { mongooseToObject } = require('../../util/mongoose');
class CourseController {
    //[GET] //course/: slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[GET] //course/create : hiển thị ra form ở đây
    create(req, res, next) {
        res.render('courses/create');
    }
    //[POST] //course/store: sau khi submit form thì dữ liệu đươc nhận ở đây
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        //lấy data từ DB ra
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id   chọc vào db có id tương thích và update lại db
    updated(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE], /course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            // khi thực hiện xóa thành công thì chuyên hướng quay ngược trở lại
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE], /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH]/courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST], /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                //xóa tất cả những thằng nào có id nằm trong cái list này {$in: req.body.coursesIds } docs của thằng mongooseDB (where in)
                Course.delete({ _id: { $in: req.body.coursesIds }})
                    // khi thực hiện xóa thành công thì chuyên hướng quay ngược trở lại
                    .then(() => res.redirect('back'))
                    .catch(next);
                break
            case 'deleteMany':
                Course.deleteMany({ _id: { $in: req.body.coursesIds }})
                    // khi thực hiện xóa thành công thì chuyên hướng quay ngược trở lại
                    .then(() => res.redirect('back'))
                    .catch(next);
                break
            case 'restore':
                Course.restore({ _id: { $in: req.body.coursesIds }})
                    // khi thực hiện xóa thành công thì chuyên hướng quay ngược trở lại
                    .then(() => res.redirect('back'))
                    .catch(next);
                break
            default: 
                res.json({message: 'Actions is Invalid!!'})
        }
    }
}

module.exports = new CourseController();

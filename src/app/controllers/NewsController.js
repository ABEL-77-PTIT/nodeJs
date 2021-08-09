class NewsController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/:slug    đoạn này cấu hình các param trên url
    show(req, res) {
        res.send('hello ban tre');
    }
}

module.exports = new NewsController();

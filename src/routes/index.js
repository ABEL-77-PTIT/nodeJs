const newsRoute = require('./news')
const siteRoute = require('./site')

function route(app) {
    app.use('/news', newsRoute)
    app.use('/', siteRoute )
    app.use('/search', siteRoute)
    
}


module.exports = route

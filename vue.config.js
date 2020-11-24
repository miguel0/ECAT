const helmet = require('helmet');

module.exports = {
    devServer: {
        before: function(app, server, compiler) {
            //app.disable("x-powered-by");
            app.use(helmet.hidePoweredBy());
            app.use(helmet.noSniff());
            app.use(helmet.frameguard());
            /*app.use(helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    frameAncestors: ["'self'"]
                }
            }));*/

        },
        /*headers: {
            'X-Frame-Options': 'SAMEORIGIN',
            'Content-Security-Policy' : 'default-src \'self\'; frame-ancestors \'none\'',
            'X-Content-Type-Options' : 'nosniff'
        }*/
    }
}
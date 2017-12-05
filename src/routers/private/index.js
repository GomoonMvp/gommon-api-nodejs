const mount = require('koa-mount');

module.exports = function(server) {

    const userRouter = require('./userRouter');
    server.use(mount('/api/user', userRouter.routes()));

    const startedRouter = require('./startedRouter');
    server.use(mount('/api/v1/started', startedRouter.routes()));

};

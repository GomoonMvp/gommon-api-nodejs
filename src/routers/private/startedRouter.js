'use strict';
const Router = require('koa-router');

let startedRouter = new Router();

startedRouter.get('', function* (next) {
    try {
        this.body = {
            message: "GO GO GO!"        
        }
    } catch (e) {
        console.log(e);
        this.status = 500;
        this.exception = e;
        this.body = e.message;
    } finally {
        yield next;
    }
});

module.exports = startedRouter;

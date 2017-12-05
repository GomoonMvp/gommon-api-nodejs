'use strict';
const Router = require('koa-router');

let helloRouter = new Router();

helloRouter.get('', function* (next) {
    try {
        this.body = {
            message: "Hello GoMoon Tamplate Rest API",
            version: "1.0"
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

module.exports = helloRouter;

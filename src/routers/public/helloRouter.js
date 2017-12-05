'use strict';
const Router = require('koa-router');

let helloRouter = new Router();

helloRouter.get('/', function* (next) {
    try {
        this.body = {
            message: "Bem vindo ao GoMoon Tamplate Rest API",
            version: "1.0",
            website: "www.gomoon.com.br"
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
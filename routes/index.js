const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const categoryRouter = require('./category.router');
const productRouter = require("./product.router");
const saleRouter = require("./sale.router");
const purchaseRouter = require("./purchase.router");
const adressRouter = require("./adress.router");

function routerApi(app) {
    const router = express.Router();

    app.use('/api/v1', router);
    router.use('/users', userRouter);
    router.use('/auth', authRouter);
    router.use('/categories', categoryRouter);
    router.use('/products', productRouter);
    router.use('/sales', saleRouter);
    router.use('/purchases', purchaseRouter);
    router.use('/adresses', adressRouter);
}

module.exports = routerApi;
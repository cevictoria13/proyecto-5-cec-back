const express = require('express');
const auth = require('../middleware/auth')
const admin = require('../middleware/auth')
const { getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    reduceStock } = require('../controllers/productController')

const productRouter = express.Router();


productRouter.route('/products') // URL que se ve en postman http://localhost:8080/products
    .get(getProducts) 

productRouter.route("/createProduct")
    .post(createProduct)

productRouter.route("/product/:id")
    .get(getProductById)
    .put( editProduct)
    .delete(deleteProduct)

productRouter.route("/reduceStock")
    .put(reduceStock)

module.exports = productRouter;
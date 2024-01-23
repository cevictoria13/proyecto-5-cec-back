const express = require('express');
const auth = require('../middleware/auth')
const admin = require('../middleware/auth')
const { getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    reduceStock,
    getCategories} = require('../controllers/productController')

const productRouter = express.Router();


productRouter.route('/products') // URL que se ve en postman http://localhost:8080/products
    .get(getProducts) 

productRouter.route("/createProduct")
    .post(auth, admin, createProduct)

productRouter.route("/product/:id")
    .get(getProductById)
    .put( auth, admin, editProduct)
    .delete(auth, admin, deleteProduct)

productRouter.route("/reduceStock")
    .put(reduceStock)

productRouter.route("/categories")
    .get(getCategories)    

module.exports = productRouter;
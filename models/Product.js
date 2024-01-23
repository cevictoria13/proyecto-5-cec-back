const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    categorie: String,
    items: [productSchema]

})

const colorsSchema = new mongoose.Schema({
    red: {
        type: String
    },
    blue: {
        type: String
    }
})


//cada categoría-entidad se debe hacer en una tabla diferente: constSchema. Modelo bebestible, modelo postres, etc
const productSchema = new mongoose.Schema({
    id: String,
    sku: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 6
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 130,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 1000000000
    },
    image: String,
    
    details: {
        typeProduct: {
            type: String,
        },
        material: {
            type: String
        },
        weight: {
            type: Number,
            min: 0.1
        },
        color: {colorsSchema}

    },
    stock: {
        type: Number,
        default: 0,
        required: true,
        min: 0
    },
},{
      timeStamps:true
})


const Product = mongoose.model("products", productSchema)
const Categories = mongoose.model("categories", categoriesSchema)
//categories se debe escribir igual a como está en mongoose

module.exports = { Product, Categories }





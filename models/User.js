const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



// clase 23
{/*const rolSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        minLength: 2
    },
    funcionalidades: {
        type: String
    },
})*/}


const rolSchema = new mongoose.Schema({
    admin: {
        rolAdmin: {
            adminLocal: {
                type: Boolean,
                required: true,
                default: false
            },
            adminGlobal: {
                type: Boolean,
                required: true,
                default: false
            }
        },
    }
})

{/*
const rolSchema = new mongoose.Schema ({
    username: { type: String },
    password: { type: String },
    admin: { type: String,
    enum: ["Administrador", "Editor"]
}
})
*/}



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Nombre no especificado",
        trim: true,
        lowercase: true,
        minLength: 2
    },
    email: {
        type: String,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
        required: true
    },
    age: {
        type: Number,
        min: 16,
        max: 120
    },
    password: {
        type: String,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/gm],
        required: true
    },
    salt: String,
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    rol: [rolSchema],

    favoriteProducts: {
        type: mongoose.Types.ObjectId,
        ref: "product"
    }
})



userSchema.methods.encriptarPassword = function (password) {
    this.salt = crypto.randomBytes(10).toString('hex')
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 10, 'sha-512').toString('hex')
}

userSchema.methods.verificarEncriptacion = function (password, salt, passwordDB) {
    const encriptar = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha-512').toString('hex')
    return encriptar === passwordDB // true o un false
}

userSchema.methods.generateToken = function () {
    const payload = {
        id: this._id,
        name: this.name,
        email: this.email,
        age: this.age,
        password: this.password
    } //completar con los demás datos que se solicitan más arriba

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 900 })
    return token

}

const User = mongoose.model('user', userSchema); 
module.exports = User;
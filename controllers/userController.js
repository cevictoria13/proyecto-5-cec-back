const User = require('../models/User');

const createUser = async (req, res) => {

    try {


        const useEmail = await User.findOne({ email: req.body.email })

        if (useEmail) {
            throw new Error("Email en uso!")
        }

        const newUser = new User(req.body);
        newUser.encriptarPassword(req.body.password);
        await newUser.save();


        res.status(201).json({
            success: true,
            message: "Usuario Creado",
            info: newUser, _id,
            token: newUser.generateToken()
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('favoriteProducts');
        res.json({ success: true, info: users })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Funcion actualizar 

const editUser = async (req, res) => {

    const updateUser = req.body
    const { id } = req.auth
    console.log(id)

    try {
        const email = await User.find()
        email.forEach(user => {
            if (user.email === req.body.email) {
                throw new Error("Email en uso")
            }
        })

        const result = await User.findByIdAndUpdate(req.auth.id, updateUser, { new: true }).select("-password -salt")
        if (!result) {
            throw new Error("Usuario no existe, imposible editar")
        }
        res.json({ success: true, message: "Usuario actualizado con éxito", info: result })


    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//Función eliminar
const deleteUser = async (req, res) => {
    try {
        // throw new Error('error forzado')
        const { id } = req.params;

        const destroyUser = await User.findByIdAndDelete(id);

        res.json({ success: true, msg: "usuario eliminado", destroyUser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//quinto controlador --> login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error("Usuario no existe")
        }

        const validarPassword = user.verificarEncriptacion(password, user.salt, user.password)

        if (!validarPassword) {
            throw new Error('Email o contraseña incorrecta')
        }


        res.json({
            success: true,
            msg: "has iniciado sesión correctamente",
            token: user.generateToken()
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//verificación del usuario
const getUserVerify = async (req, res) => {
    try {
        const { id } = req.auth;
        const result = await User.findById(id).populate('favoriteProducts').select("-password -salt")

        res.json({ success: true, msg: `Información de: ${result.email}`, info: result })
    } catch (error) {
        res.json({ success: false, msg: error.msg })

    }
}

//traer el perfil del usuario
const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const getInfoUser = await User.findById(id).select("-password -salt")

        res.json({
            success: true,
            info: getInfoUser
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { createUser, getUsers, editUser, deleteUser, loginUser, getUserVerify, getProfile };

//se podría agregar getProfile
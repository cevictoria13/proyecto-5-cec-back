const express = require('express');
const { createUser, getUsers, editUser, deleteUser, loginUser, getUserVerify, getProfile } = require('../controllers/userController')
const { auth } = require('../middleware/auth.js')
const userRouter = express.Router();


userRouter.route('/user')
    .post(createUser)
    .get(auth, getUsers)

userRouter.route('/user/:id')
    .delete(auth, deleteUser)

userRouter.route('/user/signin')
    .post(loginUser)

userRouter.route('/user/verificar-usuario')
    .get(auth, getUserVerify)

userRouter.route('/user/edit-profile')
    .put(auth, editUser)



module.exports = userRouter;
//Core modules
const path= require('path')

//External modules
const express  = require('express')
const authRouter = express.Router();

//local module
const authController = require('../controllers/auth')
//const rootDir = require('../utils/pathUtil');
//const { registeredHomes } = require('./hostRouter');

//This middleware shows the home page
authRouter.get("/login",authController.getLogin);
authRouter.post("/login",authController.postLogin)
authRouter.post("/logout",authController.postLogout)


module.exports= authRouter;

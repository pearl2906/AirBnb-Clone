//Core modules
const path= require('path')

//External modules
const express  = require('express')
const userRouter = express.Router();

//local module
const homeController = require('../controllers/homes')
//const rootDir = require('../utils/pathUtil');
//const { registeredHomes } = require('./hostRouter');

//This middleware shows the home page
userRouter.get("/",homeController.getHomes);
userRouter.get("/favourites",homeController.getAddFav)
userRouter.get("/homes/:homeId",homeController.getHomeDetails)
userRouter.post("/favourites",homeController.postAddFav)
 

module.exports=userRouter;

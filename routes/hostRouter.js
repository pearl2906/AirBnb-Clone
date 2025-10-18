const path = require('path');
const express = require('express')

const hostRouter = express.Router();
const rootDir = require('../utils/pathUtil'); // this is file helper

// local module for controller
const homeController = require('../controllers/homes')

hostRouter.get("/add-home",homeController.getAddHome)
hostRouter.post("/add-home",homeController.postAddHome)
hostRouter.post("/edit-home",homeController.getEditHome)
hostRouter.get('/home/:homeId', homeController.getHomeDetails);


exports.hostRouter= hostRouter;


































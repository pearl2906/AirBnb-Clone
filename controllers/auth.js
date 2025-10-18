const path = require('path');
const rootDir = require('../utils/pathUtil');

exports.getLogin = (req, res, next) => {
    res.render("login", {
        // isLoggedIn: req.isLoggedIn // Use login status from middleware
        isLoggedIn: false
    });
} 

exports.postLogin = (req, res, next) => {
    console.log(req.body);
    req.session.isLoggedIn = true;
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
   req.session.destroy(()=>{
   res.redirect('/');
   });
};
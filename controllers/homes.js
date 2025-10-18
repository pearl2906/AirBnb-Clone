const path = require('path');
const rootDir = require('../utils/pathUtil');
const Home = require('../models/homeStamp');
const Favourite = require('../models/favourite');

const favourites = [];
const registeredHomes =[];

exports.getAddHome = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-home.html'))
}

exports.getEditHome = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','edit-home.ejs'))
}



exports.postAddHome = (req,res,next)=>{
    const { houseName, description, location, price, guests, imageUrl } = req.body;
    console.log("Received new home registration:", {
        houseName,
        description,
        location,
        price,
        guests,
        imageUrl
    }); 
    const newHome = new Home({
        houseName,
        description,
        location,
        price,
        guests,
        imageUrl
    });
    newHome.save().then((rows) =>{
        // Use sendFile if you have home-added.html
        res.sendFile(path.join(rootDir,'views','home-added.html'));
        // If you want to use EJS, make sure home-added.ejs exists and use:
        // res.render("home-added");
    }).catch(err => {
        console.log(err);
        res.status(500).send("Error adding home");
    });
}



exports.getHomes = (req, res, next) => {
    Home.find()
        .then(registeredHomes => {
            res.render('home', {
                registeredHomes: registeredHomes,
                isLoggedIn: req.isLoggedIn // Now you're passing it
            });
            console.log(registeredHomes);
        })
        .catch(err => {
            console.log(err);
            res.render('home', {
                registeredHomes: [],
                isLoggedIn: req.isLoggedIn // And here for error cases
            });
        });
}





// exports.getHomes = (req, res, next) => {
//     Home.find()
//         .then(registeredHomes => {
//             res.render('home', {
//                 registeredHomes: registeredHomes,
//                 isLoggedIn: req.isLoggedIn// Add this line
//             });
//             console.log(registeredHomes);
//         })
//         .catch(err => {
//             console.log(err);
//             res.render('home', {
//                 registeredHomes: [],
//                 isLoggedIn: req.isLoggedIn
//             });
//         });
    //res.sendFile(path.join(rootDir,'views','home.html'))
//}
    // exports.getRegisteredHomes = () => {
    //     return registeredHomes;
    // };   




exports.getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    const { ObjectId } = require('mongodb');
    if (!ObjectId.isValid(homeId)) {
        return res.status(400).render("home-details", {
            home: null,
            message: "Invalid Home ID"
        });
    }
    Home.findById(homeId)
        .then(home => {
            if (!home) {
                return res.status(404).render("home-details", {
                    home: null,
                    message: "Home not found"
                });
            }
            res.render("home-details", {
                home: home,
                message: null
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).render("home-details", {
                home: null,
                message: "Error fetching home"
            });
        });
};

 

exports.getAddFav = (req, res, next) => {
    Favourite.find().populate('home').then(favourites => {
        // Extract home objects from favourites
        const favouriteHomes = favourites.map(fav => fav.home);
        res.render("favourites", {
            favourites: favouriteHomes
        });
    }).catch(err => {
        console.log(err);
        res.render("favourites", {
            favourites: []
        });
    });
};





exports.postAddFav = (req, res, next) => {
    const homeId = req.body.id;
    Home.findById(homeId)
        .then(home => {
            if (home) {
                const fav = new Favourite({ home: home._id });
                return fav.save();
            }
        })
        .then(() => {
            res.redirect("/favourites");
        })
        .catch(err => {
            console.log(err);
            res.redirect("/favourites");
        });
};

exports.getIndex = (req,res,next)=>{
    console.log("Session value: ", req.session)
}
// No changes needed if you use the callback pattern in Home model

// exports.postDeleteHome(req,res,next) => {
//     const homeId = req.params.homeId;
//     console.log('Came to delete',homeId);
//     Home.deleteById(homeId,error=>{
//         if(error){
//             console.log("Error while deleting",error);
//         }
//         res.redirect('/host/home');
//     })
    
// };
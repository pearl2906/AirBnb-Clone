//core modules
const path = require('path');

// External module
const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const db_path = "mongodb://localhost:27017/airbnb";


//local modules
const userRouter = require('./routes/userRouter')
const {hostRouter} = require('./routes/hostRouter')
const authRouter = require('./routes/authRouter')
const rootDir = require('./utils/pathUtil');
const ErrorsController = require('./controllers/errors');
const { mongoConnect } = require('./utils/databaseUtil');
const {default: mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

//creating app for express
const app = express();

// // This middleware just logs the url and method of the request
// app.use((req,res,next)=>{
//     console.log(req.url, req.method);
//     next();
// })



app.set('view engine','ejs'); // ejs , Dynamic ui , view engine is the default extension, 
app.set('views','views'); // ui is in views folder


const store = new MongoDBStore({
  uri: db_path,
  collection: 'sessions'
})

app.use(express.urlencoded({extended:true})) // using the body of POST req
app.use(session({
  secret:"hihello",
  resave:false,
  saveUninitialized:true,
  store
}))
app.use(cookieParser());


app.get('/', (req, res) => {
    // Check if the cookie exists and its value is 'true' (cookies are strings)
    const isLoggedIn =req.session.isLoggedIn; 

    const registeredHomes = [ /* ... your home data ... */ ];

    res.render('home', {
        registeredHomes: registeredHomes,
        isLoggedIn: isLoggedIn // Pass the state to the EJS template
    });
});
//this middleware checks if user is logged in or not 
app.use((req,res,next)=>{
   // req.isLoggedIn = req.get('Cookie')? req.get('Cookie').split('=')[1] === 'true' : false;
    req.isLoggedIn = req.session.isLoggedIn;
    next();
  })

app.use(authRouter); 
app.use(userRouter); // handles the user query
app.use("/host", (req, res, next) => {
 if (req.isLoggedIn) {
  next();
 } else {
  res.redirect('/login');
 }
});  // handles the host query

app.use("/host",hostRouter);
//serve the public files 
app.use(express.static(path.join(rootDir,'public')))

app.use(ErrorsController.pageNotFound);

const PORT = 3000;

// mongoConnect(client =>{
// console.log(client);
// app.listen(PORT,()=>{
//     console.log(`Server running at address http://localhost:${PORT}`);
// });
// });


mongoose.connect(db_path).then(()=>{
    console.log("MongoDB connected");
    app.listen(PORT, () => {
    console.log(`Server running at address http://localhost:${PORT}`);
  });
}).catch(err => {
    console.log('Error while connecting to mongo: ',err);
});

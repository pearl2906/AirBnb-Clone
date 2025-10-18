//core module
const path = require('path')

module.exports= path.dirname(require.main.filename)

//local modules
// const userRouter = require('../routes/userRouter');

// userRouter.get('/',(res,res,next)=>{
//     console.log("Second middle ware", req.url,req.method);
//     res.sendFile(path.join(rootDir,'views','user.html'))
    
// })
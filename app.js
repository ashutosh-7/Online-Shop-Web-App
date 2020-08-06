const express = require('express'); 
const path = require('path');
const rootDir = require('./util/path.js');
const bodyParser =require('body-parser');
const errorControllers = require('./controllers/error');
const mongoose = require('mongoose');
const flash=require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf= require('csurf');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const indexRoutes= require('./routes/index');
const adminRoutes= require('./routes/admin/admin');
const adminAuthRoutes= require('./routes/admin/adminAuth');
const userAuthRoutes= require('./routes/user/userAuth');
const shopRoutes= require('./routes/user/shop');
const Admin= require('./models/Admin');
const User = require('./models/User.js');

const app=express();
const csrfProtection = csrf();


//Db connection
const MONGODB_URI=require('./config/keys').MongoURI; //db keys
mongoose.connect(MONGODB_URI,{useNewUrlParser:true})
.then(()=>{
    console.log("Database Connection established");
})
.catch(err=>{
    console.log(err);
});


// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + '-' + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'||
//     file.mimetype === 'file/pdf.'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     // cb(new Error('I don\'t have a clue!'))
//   }
// };

// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('resume'));

// app.use('/images', express.static(path.join(rootDir, 'images')));


app.use(bodyParser.json());  //we are dealing with json
app.use(bodyParser.urlencoded({extended : false})); //parsing the post request datas
app.use(express.static(path.join(rootDir,'public'))); //including public folder accesseible like css and other stuffs in public folder are now accessible
app.set('view engine','ejs');  //express ko batata hai hum by deafult kaun sa templating engine use kar rahe
app.set('views','views'); 



//express session middlewares
const store= new MongoDBStore({
  uri:MONGODB_URI,
  collection:'sessions',
});

app.use(
    session({
      secret: 'secret', //used to sign the hashed
      resave: false,
      saveUninitialized: false,
      store:store,
      // cookie: {
      //   maxAge: 1000*60 // 1 min
      // },
      
    })
  );
  //to store user object, because in req.session.user we have only data not have full object that's why we can't use this with models methods like add to cart
app.use((req,res,next)=>{
  if(req.session.user){
  User.findById(req.session.user._id)
  .then(user=>{
    req.user=user;
    next();
  }).catch(err=>console.log(err));
}
else
{
  next();
}

});

  app.use(csrfProtection);
  app.use(flash());


// Global variables -> saare views mai hum es variables ko use kar skte hai
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.isAuthenticated = req.session.isUserLoggedIn;
    res.locals.isAdmin = req.session.isAdminLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  });

  //creating dummy admin

  // app.use('/admin/register',(req,res,next)=> {
  //   const username="Denied";
  //   const password="123";
  //   const newAdmin =new Admin({
  //     username,
  //     password
  //   });
  //   console.log("Admin created successfully");
  //     bcrypt.genSalt(10,(err,salt)=>{
  //     bcrypt.hash(newAdmin.password,salt,(err,hash)=> {
  //         if(err)
  //         throw err;

  //         newAdmin.password=hash;
  
  //         newAdmin.save()
  //         .then(user => {
              
  //             res.redirect('/');
  //         })
  //         .catch(err=> {
  //             console.log(err);
  //         });
  //     })
  // })

  // });


app.use(adminAuthRoutes);
app.use(adminRoutes);
app.use(indexRoutes);
app.use(userAuthRoutes);
app.use(shopRoutes);
app.use(errorControllers.get404);

app.listen(process.env.PORT || 3000);

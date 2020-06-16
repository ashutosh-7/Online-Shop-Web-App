const express = require('express'); //importing express
const mongoose = require('mongoose');
const path = require ('path');
const rootDir = require('./util/path.js');
const csrf= require('csurf');

const bodyParser =require('body-parser');  //importing body-parser which takes input stream from html forms
const errorControllers = require('./controllers/error');

const adminRoutes= require('./routes/admin');  //for admin routes importing
const authRoutes= require('./routes/auth');  //for admin routes importing
const shopRoutes = require('./routes/shop'); //for importing shop routes which is for users panel

const User= require('./models/user');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const app = express();  //making app as express object
const csrfProtection = csrf();
const MONGODB_URI ='mongodb+srv://admin:1416root@cluster0-dftyh.mongodb.net/shop?retryWrites=true&w=majority';

const store= new MongoDBStore({
    uri:MONGODB_URI,
    collection:'sessions',
});

app.set('view engine','ejs');  //express ko batata hai hum by deafult kaun sa templating engine use kar rahe
app.set('views','views');  // ye path batata hai kaha pe hai wo files sab

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false})); //parse form bodies
app.use(express.static(path.join(rootDir,'public'))); //including public folder accesseible

app.use(
    session ({
        secret: 'my secret',
        resave:false,
        saveUninitialized:false,
        store:store
    })
);

app.use(csrfProtection);



app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
  

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  });

app.use('/admin',adminRoutes);  
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorControllers.get404);





mongoose
.connect(MONGODB_URI)
.then(result => {
    app.listen(3000);
})
.catch(err => console.log(err));























































// process.exit();
// sudo lsof -i :3000 the kill -9 {pid}

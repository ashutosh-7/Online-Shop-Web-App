const express = require('express'); //importing express
const path = require('path');
const rootDir = require('./util/path.js'); //for getting root directory path
const adminData= require('./routes/admin');  //for admin routes importing
const shopRoutes = require('./routes/shop'); //for importing shop routes which is for users panel
const bodyParser =require('body-parser');  //importing body-parser which takes input stream from html forms


const app = express();  //making app as express object

app.set('view engine','ejs');  //express ko batata hai hum by deafult kaun sa templating engine use kar rahe
app.set('views','views');  // ye path batata hai kaha pe hai wo files sab

app.use(bodyParser.urlencoded({extended : false})); //parse form bodies
app.use(express.static(path.join(rootDir,'public'))); //including public folder accesseible

app.use('/admin',adminData.routes);  // '/admin' is a filter which we use in url
app.use(shopRoutes);

app.use((req,res,next)=> {
    res.status(404).render('404',{pageTitle: 'Page Not Found', message: 'Error 404' });
});



app.listen(3000);  //start server


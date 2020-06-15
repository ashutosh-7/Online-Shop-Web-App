const express = require('express'); //importing express
const mongoose = require('mongoose');
const path = require ('path');
const rootDir = require('./util/path.js');

const bodyParser =require('body-parser');  //importing body-parser which takes input stream from html forms
const errorControllers = require('./controllers/error');

const adminRoutes= require('./routes/admin');  //for admin routes importing
const shopRoutes = require('./routes/shop'); //for importing shop routes which is for users panel

const User= require('./models/user');

const app = express();  //making app as express object

app.set('view engine','ejs');  //express ko batata hai hum by deafult kaun sa templating engine use kar rahe
app.set('views','views');  // ye path batata hai kaha pe hai wo files sab

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false})); //parse form bodies
app.use(express.static(path.join(rootDir,'public'))); //including public folder accesseible

app.use((req,res,next) => {
    const x="5ee7be260f77b1b934b27ca1";
    User.findById(x)
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => {
        console.log(err)});
        
});


app.use('/admin',adminRoutes.routes);  
app.use(shopRoutes);
// app.use(errorControllers.get404);





mongoose
.connect('mongodb+srv://admin:1416root@cluster0-dftyh.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne().then(user=> {
        if(!user)
        {
            const user = new User({
                name:"Ashu",
                email:"erashu.yadaw@gmail.com",
                cart: {
                    items:[]
                }
            })
            user.save();
        }
    });
   
    app.listen(3000);
})
.catch(err => console.log(err));























































// process.exit();
// sudo lsof -i :3000 the kill -9 {pid}

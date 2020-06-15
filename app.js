const express = require('express'); //importing express
const adminRoutes= require('./routes/admin');  //for admin routes importing
const path = require ('path');
const rootDir = require('./util/path.js');
const shopRoutes = require('./routes/shop'); //for importing shop routes which is for users panel

const bodyParser =require('body-parser');  //importing body-parser which takes input stream from html forms
const errorControllers = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();  //making app as express object

app.set('view engine','ejs');  //express ko batata hai hum by deafult kaun sa templating engine use kar rahe
app.set('views','views');  // ye path batata hai kaha pe hai wo files sab

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false})); //parse form bodies
app.use(express.static(path.join(rootDir,'public'))); //including public folder accesseible

app.use((req,res,next) => {
    const x="5ee78e078dffe48a21802024";
    User.findById(x)
    .then(user => {
        req.user=user;
        console.log("hey i am here");
        console.log(req.user);
        next();
    })
    .catch(err => {
        // console.log("hey i am here");
        console.log(err)});
        
});

app.use('/admin',adminRoutes.routes);  
app.use(shopRoutes);



// app.use(errorControllers.get404);

mongoConnect(() => {
    app.listen(3000);
});























































// process.exit();
// sudo lsof -i :3000 the kill -9 {pid}

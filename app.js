const express = require('express'); //importing express
const path = require('path');
const rootDir = require('./util/path.js'); //for getting root directory path
const adminRoutes= require('./routes/admin');  //for admin routes importing
const shopRoutes = require('./routes/shop'); //for importing shop routes which is for users panel
const bodyParser =require('body-parser');  //importing body-parser which takes input stream from html forms
const errorControllers = require('./controllers/error');


const app = express();  //making app as express object

app.set('view engine','ejs');  //express ko batata hai hum by deafult kaun sa templating engine use kar rahe
app.set('views','views');  // ye path batata hai kaha pe hai wo files sab

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({extended : false})); //parse form bodies
app.use(express.static(path.join(rootDir,'public'))); //including public folder accesseible

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user=user;
        next();
    })
    .catch(err => console.log(err));

});

app.use('/admin',adminRoutes.routes);  // '/admin' is a filter which we use in url
app.use(shopRoutes);



app.use(errorControllers.get404);

//associations
Product.belongsTo(User,{ constraints:true, onDelete:'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart ,{through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product , { through : OrderItem});


sequelize
.sync()
.then(result => {
    return User.findByPk(1);

})
.then(user=> {
    if(!user    )
    {
    return  User.create({name :'Ashutosh Yadav',email:'xyz@gmail.com'});
    }
    // console.log(user);
    return user;
})
.then(user=> {
    // console.log(user);
    app.listen(3000);  //start server
})
.catch(err => console.log(err) );


// process.exit();
// sudo lsof -i :3000 the kill -9 {pid}

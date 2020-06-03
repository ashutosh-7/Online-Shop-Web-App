const express = require('express');
const app = express();

app.use((req,res,next) => {    //it allows to use middleware which is define by express js

    console.log("In middleware 1");
    next(); //dusre middleware mai chala gaya
});
app.use((req,res,next) => {
    console.log("In middleware 2");
    res.send('<h1> Hello From Express!</h1>');
});


app.listen(3000);  //start server
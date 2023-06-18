//entry point is app.js

const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const db=require("./config/mongoose");
const app=express();

const port=8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('assets'));
app.use('/', require('./routes'));

///////////////////////



app.listen(port, function(err) {
if(err) {
    console.log(`error message: ${err}`);
}
else {
    console.log("app is running and listening to \
    port number 8000");
}
});
const express = require('express');
const path = require('path');

const app = express();

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/',defaultRoutes);
app.use('/',restaurantRoutes);


 app.use(function (req, res){
   res.status().render('404', { title: 'Page Not Found'});
 });

app.use(function(err, req, res, next){
   res.status().render('505', { title: 'Internal Server Error', error: err });
});

app.listen(3002);
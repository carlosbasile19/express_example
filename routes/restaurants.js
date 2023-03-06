const express = require('express');
const resData = require('../util/restaurant-data');
const uuid = require('uuid');

const router = express.Router();


router.get('/restaurants', function(req, res){
    
    const storedRestaurants = resData.getStoredRestaurants();

    let order = req.query.order;

    let nextOrder = 'asc';

    if(order === 'asc'){
      nextOrder = 'desc';
    }
    
    storedRestaurants.sort(function(resA, resB){
      if(order === 'asc' && resA.name > resB.name){
        return 1;
      }else if(order === 'desc' && resA.name < resB.name){
        return 1;
      }
      return -1;
    });

    res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants, nextOrder: nextOrder});

});

router.get('/restaurants/:id', function(req, res){
  const storedRestaurants = resData.getStoredRestaurants();

  const restaurantId = req.params.id;

  for(const restaurant of storedRestaurants){
    if(restaurantId === restaurant.id){
      return res.render('restaurant-detail', {restaurant: restaurant});
    }
  }

  res.render('404');
  
});



router.get('/confirm',function(req, res){
    res.render('confirm');
 });

 router.get('/recommend',function(req, res){
    res.render('recommend');
 });

 router.post('/recommend',function(req, res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const storedRestaurants = resData.getStoredRestaurants();
    storedRestaurants.push(restaurant);

    resData.storeRestaurants(storedRestaurants);
    
    res.redirect('/confirm');

 });

 module.exports = router;
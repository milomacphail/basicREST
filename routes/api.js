//require express
const express = require('express');
const router = express.Router();
const Friend = require('../models/friends');


//get request to see all nearby friends
router.get('/friends', function(req, res){
   Friend.aggregate().near({
   near: {
    'type': 'Point',
    'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
   },
   maxDistance: 100000,
   spherical: true,
   distanceField: "dis"
  }).then(function(friends){
     res.send(friends);
  });
});

//add new friend
router.post('/friends', function(req, res, next){
   Friend.create(req.body).then(function(friend){
      res.send(friend);
   }).catch(next)
   
});

//edit information about friend
router.put('/friends/:id', function(req, res, next){
   Friend.findByIdAndUpdate({_id:req.params.id}, req.body, {new: true}).then(function(friend){
      res.send(friend);
   });
});

//delete friend
router.delete('/friends/:id', function(req, res, next){
   Friend.findByIdAndRemove({_id:req.params.id}).then(function(friend){
      res.send(friend);
   });
});

module.exports =  router;
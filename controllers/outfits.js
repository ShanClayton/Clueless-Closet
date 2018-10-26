const express = require('express');
const router = express.Router();
const Outfits = require('../models/outfits.js');

router.get('/', (req, res)=>{
  Outfits.find({}, (err, foundOutfits)=>{
    res.json(foundOutfits)
  })
})


router.post('/', (req, res)=>{
  Outfits.create(req.body, (err, createdOutfit)=>{
    res.json(createdOutfit)
  })
});


router.delete('/:id', (req, res) => {
    Outfits.findByIdAndRemove(req.params.id, (err, deletedOutfit) => {
        res.json(deletedOutfit);
    })
})


router.put('/:id', (req, res)=>{
  Outfits.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedOutfit)=>{
    res.json(updatedOutfit);
  })
})

module.exports = router;

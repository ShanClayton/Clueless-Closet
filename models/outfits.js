const mongoose = require('mongoose');


const OutfitSchema = new mongoose.Schema({
  category: String,
  type: String,
  image: String,
  season:String,
  occasion: String
})

const Outfits = mongoose.model('Outfits', OutfitSchema);

module.exports = Outfits;

const mongoose = require('mongoose');


const OutfitSchema = new mongoose.Schema({
  category: String,
  type: String,
  image: String,
  tag:[String]
})

const Outfits = mongoose.model('Outfits', OutfitSchema);

module.exports = Outfits;

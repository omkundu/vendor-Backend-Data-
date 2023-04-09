const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name : String,
    type : String,
    description : String,
    price : Number,
    image : String,
    userID : String,
})

const ProductModel = mongoose.model("product", productSchema)

module.exports = {
   ProductModel
}

/*
{
  name: 'Bata',
  description: 'Very comfertiable',
  price: '4500',
  image: 'https://thumbs.dreamstime.com/b/blue-shoes-29507491.jpg'
}
 */
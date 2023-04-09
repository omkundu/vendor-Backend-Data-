const mongoose = require("mongoose")

const venderSchema = mongoose.Schema({
    email : String,
    password : String,
    name : String,
    city : String,
})

const VenderModel = mongoose.model("vender", venderSchema)

module.exports = {
    VenderModel
}
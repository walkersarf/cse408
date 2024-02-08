//Importing the mongoose library
const mongoose = require("mongoose");

//using monoose to create the product schema
const productSchema = mongoose.Schema({
    productId:{
        type:Number
    },
    productName:{
        type:String
    },
    brandName:{
        type:String
    },
    productSize:{
        type:String
    },
    category:{
        type:String        
    },
    mrp:{
        type:Number, 
    },
    description:{
        type:String
    },
 });

//exporting the product schema
module.exports = mongoose.model('Product', productSchema);
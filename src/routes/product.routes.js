//Importing the product controller 
const express = require("express");

//Importing express router
const router = express.Router();

//Importing the product controller 
const { create, update, get, show, deleteProduct} =  require("../controller/product.controller");


//Importing the product validation function from validation.middleware
const { productSchema } = require("../middleware/validation.middleware");


// Route for creating a product 
router.post("products/create", productSchema, create);

//Route to update a specfic product
router.put("products/update/:id", productSchema, update);

//route to get all products
router.get("products/get", get);

//route to get or show only a specfic product
router.get("products/show/:id", show);

//route to delete a specfic product
router.delete("products/delete/:id", deleteProduct); 

//Exporting the routes 
module.exports = router;
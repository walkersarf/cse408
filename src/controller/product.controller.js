//Importing express-async-handler
const asyncHandler = require("express-async-handler"); 

/*
  =============================================================================
 NB:express-async-handler is Simple middleware for handling exceptions 
 inside of async express routes and passing them to your express error handlers.
  =============================================================================
*/

//Importing the product model to the controller 
const productModel = require("../models/product.models");

//Importing the UUIDv4 Library
//const { v4: uuidv4 } = require('uuid')

//Get all products async function 
const get = asyncHandler(async (req, res) => {
    console.log("GET request received")
    //Fetching all products from the database and assigning it to products
    const products = await productModel.find();

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: products.reverse()
    })
    //I use .reverse() function to get the latest datas at first  
}
);

//Get Single Product
const show = asyncHandler(async (req, res) => {
    //Destructing id from req.params
    const { id } = req.params

    //Fetching single product using the id in the req.params from the database and assigning it to product
    const product = await productModel.findOne({ productId: id });

    try {
        if(product){

            //Responding the data to any request made
            return res.status(200).json({
                success: true,
                data: product
            })
        }
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}
);

const create = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const { product_ID,	product_name, brand_name, product_size,	category,
        mrp, description
    } = req.body

    //we use uuidv4 to generate a random and unique id for the products
    const productId = uuidv4();

    try {
        //creating the product
        const product = await new productModel({
            productId: product_ID,
            productName: product_name,
            brandName: brand_name,
            productSize: product_size,
            category: category,
            mrp: mrp,
            description: description
        })
        //save the product
        product.save();

        return res.status(201).json({
            success: true,
            message: "product created sucessfully",
            data: product
        })
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
});

const update = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const { name, description, price } = req.body

    //Destructing the id from req.params
    const { id } = req.params

    //assigning the specfic product to variable called product
    let product = await productModel.findOne({ productId: id });

    try {

        if (product) {
            //updating the datas of that product
            product.updateOne(
                {
                    $set: {
                        productId: product_ID,
                        productName: product_name,
                        brandName: brand_name,
                        productSize: product_size,
                        category: category,
                        mrp: mrp,
                        description: description,
                        price: price
                    }
                },
                {}, { new: true }
            )

            return res.status(201).json({
                success: true,
                message: "product updated sucessfully",
                data: product
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "product not found",
            })
        }

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
});
//Delete a single product
const deleteProduct = asyncHandler(async (req, res) => {
    //Destructing id from req.params
    const { id } = req.params

    try {

    //Fetching single product using the id in the req.params from the database and assigning it to product
    await productModel.deleteOne({ productId: id });

    //Since there is no data to be responde we simple send a message
    return res.status(410).json({
        success: true,
        message: "product deleted sucessfully",
    })

    } catch (error) {
            return res.status(412).send({
                success: false,
                message: error.message
            })
        }
    
})
//Exporting the functions
module.exports = {
    get,
    show,
    create,
    update,
    deleteProduct,
}
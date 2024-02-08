//Importing tha validate.js from utils 
const validator = require("../utils/validate")

//creating the product validation 
const productSchema = async (req, res, next) => {
    
    //creating the validation rule for every input filed
    const validateRule = {
    /*
    productId: product_ID,
            productName: product_name,
            brandName: brand_name,
            productSize: product_size,
            category: category,
            mrp: mrp,
            description: description
            */    

        "productName" : ["required","isLength:4"],
        "productName": "required|string",
        "brandName": "required|string",
        "productSize": "required|string",
        "category": "required|string",
        "description": "required|string", 
        "mrp":"required|number"
    }
    
    //validating 
    /*
  ===============================================================
    THE CODE BELOW ACEEPTS THE DATA FROM REQ.BODY AND GIVE THEM AS 
    THE FIRST PARAMATER OF THE VALIDATIOR WHICH IS "DATA", AND THEN
    CHECK THE DATA USING THE validateRule THEN CHECK IF IT HAS ERROR, 
    OR SUCCESSED AND SEND STATUS
  ===============================================================
*/
    await validator(req.body, validateRule, {}, (err, status) =>{
        if (!status){
            res.status(412)
            .send({
                success: false,
                    message: 'Validation failed',
                    data: err
            })
        
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

//Exporting the validation function to make it avalaible in every modules
module.exports = {
    productSchema
}
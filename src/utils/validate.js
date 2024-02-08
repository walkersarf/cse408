/*
  ===============================================================
    The snippet above shows how to initialize the validatorjs package
    in AMD format. This method simplifies our code when writing 
    multiple validation middlewares.
  ===============================================================
*/
const Validator = require('validatorjs');
const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
module.exports = validator;
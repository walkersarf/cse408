// Importing the development support form utils/development.js 
const { printConsole } = require("../utils/development.js");

//Importing the mongoose library used to make the mongodb connection
const mongoose = require("mongoose")

//Importing the mongodb atlas link 
const MONGO_DB_URI = process.env.MONO_REMOTE_URL; 

const connectToDB = async () => {
    try {
      printConsole(
  
        { data: "Connecting to MongoDB ......" },
        { printLocation: "db_config.js:12" },
        { textColor: "yellow" }
      );

      //creating the mongodb database connection by using MONOG_DB_URI
      const DBConnection = await mongoose.connect("mongodb+srv://walkersarf:cr7tk8kb9@supply-chain.6oxukxh.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      printConsole(
        
        { data: `Database Connected : ${DBConnection.connection.host}` },
        { printLocation: "db_config.js:24" },
        {
          textColor: "green",
        }
      );
    } catch (error) {
      printConsole(error);
  
      process.exit(1);
    }
  };

// EXPORTING THE connectToDB function 
module.exports = connectToDB;
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

app.use(express.json());
const route = require("./routes/routes.js");




const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;


async function makeConnection(){
    try{
        await mongoose.connect(URL);
        console.log("Databse connected successfully");

        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`);
        })
        
    }
    catch(err){
        console.log(err.message);
    }
}

makeConnection();




app.use("/", route);
const express = require("express");

const { createOne, getAll, getOne,updateOne,deleteOne } = require("../controller/userController.js");

const route = express.Router();

route.post("/createone",createOne);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/updateone/:id", updateOne);
route.delete("/deleteone/:id", deleteOne);


module.exports = route
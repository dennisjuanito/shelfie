const express = require("express");
const axios = require("axios");
const controller = require("./controller.js");
const bodyParser = require("body-parser");
const port = 4004;
const massive = require("massive");
require("dotenv").config();
const app = express();

// middle ware
app.use(express.static(__dirname + "/build"));
app.use(bodyParser.json());

// end points
app.get(`/api/inventory`, controller.getInventory);
app.get(`/api/inventory/:id`, controller.getInventoryById);
app.post(`/api/product`, controller.createProduct);
app.delete(`/api/inventory/:id`, controller.deleteInventory);
app.put(`/api/inventory/:id`, controller.editProduct);


let { connectingString } = process.env;

// massive must run first before app start to listening
massive(connectingString).then(connection => {
  app.set("db", connection);
  app.listen(port, () => {
    console.log("You are in the port" + port);
  });
});

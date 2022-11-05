const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const customer = require("./routes/customerRoutes");
const product = require("./routes/productRoutes");

app.use("/customers", customer);
app.use("/products", product);

app.listen(3001, function () {
  console.log("server is running on port 3001");
});

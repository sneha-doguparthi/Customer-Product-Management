const express = require("express");
const bodyParser = require("body-parser");
const connection = require("../database/connect");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

exports.getProducts = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM products";
    connection.query(sqlQuery, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } catch {
    res.status(500).json({ message: err });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const productName = req.body.productName;
    const sqlQuery = `INSERT INTO products(product_name) values("${productName}");`;
    connection.query(sqlQuery, (err, results) => {
      if (err) throw err;
      res.status(200).json({ message: "success", productId: results.insertId });
    });
  } catch {
    res.status(500).json({ message: err });
  }
};

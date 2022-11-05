const express = require("express");
const bodyParser = require("body-parser")
const connection = require("../database/connect")
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
 

exports.getAllCustomers = async(req,res) => {
  try {
    const sqlQuery = "SELECT * FROM customers";

    connection.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(results);
    });
  
  }catch( error ){
    res.json({message: err})
  }
}

exports.addCustomer = async(req,res) => {
  try{
    const customerName = req.body.customerName
    const minAmount = req.body.minAmount
    const maxAmount = req.body.maxAmount
  
    const sqlQuery1 = `INSERT INTO customers(customer_name) values("${customerName}");`
    const sqlQuery2 = `SELECT customer_id from customers where customer_name="${customerName}";`
    connection.query(sqlQuery1, (err, results) => {
      if(err) throw err;
    });
  
    connection.query(sqlQuery2, (err, results) => {
      if(err) throw err;
      const sqlQuery3 = `INSERT INTO customer_product values(${results[0].customer_id},1,${minAmount},${maxAmount});`
  
      connection.query(sqlQuery3, (err, insertResult) => {
        if(err) throw err;
        res.status(200).json({message:"success", customerId: results[0].customer_id});
      });
    
    });
  
  }catch(error){
    res.status(500).json({message:error})
  }
}

exports.getProductsByCustomer = async(req,res) => {
  try{
    const customerId = req.params.customerId
    const sqlQuery = `SELECT P.product_id, P.product_name,CP.min_amount, CP.max_amount FROM products P,customer_product CP, customers C WHERE CP.customer_id=C.customer_id and CP.product_id=P.product_id and CP.customer_id=${customerId};`;
    connection.query(sqlQuery, (err, results) => {
      res.send(results);
    })
  
  }catch{
    res.status(500).json({message:error})

  }
}

exports.addProductByCustomer = async(req,res) => {
  try{
    const productId = req.body.productId
  const customerId = req.body.customerId
  const minAmount = req.body.minAmount
  const maxAmount = req.body.maxAmount
  const sqlQuery1 = `select min_amount,max_amount from customer_product where customer_id=${customerId} and product_id=1;`
  connection.query(sqlQuery1, (err, range) => {
    if(err) throw err;
    const sqlQuery2 = `select sum(max_amount) as total from customer_product where customer_id = ${customerId} and product_id != 1;`

    connection.query(sqlQuery2, (err, results) => {
      if(err) throw err;
      console.log("Results", results[0])
      if(range[0].max_amount == null){
        res.send({status: 500, message: `Cannot find the max amount of this product in database. Please add the total preference of fruits`, result:null})

      }
      else if(results[0].total + maxAmount < range[0].max_amount) {
        let sqlQuery3 = `INSERT INTO customer_product(customer_id,product_id,min_amount,max_amount) VALUES(${customerId},${productId},${minAmount},${maxAmount});`

        connection.query(sqlQuery3, (err, results) => {
          if(err) throw err;
          res.send({message:`success in adding the product to customer ${customerId}`, result: results});
        });
  
      }
      else{
        res.send({status: 500, message: `Total fruits for this customer cannot exceed ${range[0].max_amount}`})
      }
    });
  });
  }catch(error){
    res.status(500).json({message:error})
  }
}
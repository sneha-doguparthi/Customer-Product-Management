import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import DataTable from "./DataTable";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../App";
import { addProductByCustomer, getProducts } from "../utils/api";

const Products = () => {
  const {
    products,
    setProducts,
    allProducts,
    setAllProducts,
    selectedCustomer,
  } = useContext(AppContext);

  const onSave = (name, minCount, maxAmount, product) => {
    const selectedProduct = allProducts.find((p) => {
      return p.product_id === product;
    });
    setProducts([
      ...products,
      {
        product_id: selectedProduct.product_id,
        product_name: selectedProduct.product_name,
      },
    ]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (e) {
        console.log(e);
        setAllProducts(null);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {selectedCustomer?.customer_name || ""}
      <br />
      <Button
        title="+"
        onSave={onSave}
        type="products"
        allProducts={allProducts}
      />
      <br />
      <DataTable
        title="Products"
        rows={products}
        columns={["Product_name", "MINAMOUNT", "MAXAMOUNT", ""]}
        key="Products"
        type="product"
      />
    </>
  );
};

export default Products;

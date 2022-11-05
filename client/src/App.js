import { createContext, useEffect, useState } from "react";
import "./App.css";
import Customers from "./components/Customers";
import Products from "./components/Products";
import { getAllCustomers, getProductsByCustomer } from "./utils/api";

const classes = {
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    margin: 30,
  },
  container: {
    maxHeight: 440,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginRight: 50
  },
};
export const AppContext = createContext();

function App() {
  const [customers, setCustomers] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const customers = await getAllCustomers();
        setCustomers(customers);
      } catch (e) {
        console.log(e);
        setCustomers(null);
        setProducts(null);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (selectedCustomer && selectedCustomer.customer_id) {
          const products = await getProductsByCustomer(
            selectedCustomer.customer_id
          );
          setProducts(products);
        }
      } catch (e) {
        console.log(e);
        setProducts(null);
      }
    }
    fetchProducts();
  }, [selectedCustomer]);

  return (
    <AppContext.Provider
      value={{
        customers,
        setCustomers,
        products,
        setProducts,
        selectedCustomer,
        setSelectedCustomer,
        allProducts,
        setAllProducts,
      }}
    >
      <div style={classes.root}>
        {customers && (
          <>
            <span style={classes.table}>
              <Customers />
            </span>
            <span style={classes.table}>
              {selectedCustomer && products && <Products />}
            </span>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;

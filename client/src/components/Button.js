import React, { useContext, useState } from "react";
import Modal from "react-modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AppContext } from "../App";

const classes = {
  button: {
    width: 50,
    height: 50,
    backgroundColor: "white",
  },
  modal: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "60%",
    transform: "translate(-40%, -10%)",
  },
};

const Button = ({ title, onSave, type, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(10);
  const [product, setProduct] = useState("");
  const { allProducts } = useContext(AppContext);

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button {...props} style={classes.button} onClick={toggleModal}>
        {title}
      </button>
      <Modal isOpen={isOpen} onRequestClose={toggleModal} style={classes.modal}>
        {type === "customers" && (
          <>
            <div>Enter name</div>
            <br />
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br />
            <br />
            Min Count
            <br />
            <br />
            <input
              type="number"
              onChange={(e) => setMinAmount(e.target.value)}
              value={minAmount}
            />
            <br />
            Max Count
            <br />
            <br />
            <input
              type="number"
              onChange={(e) => setMaxAmount(e.target.value)}
              value={maxAmount}
            />
            <br />
          </>
        )}
        {type === "products" && allProducts && (
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product}
                label="Product"
                onChange={handleChange}
              >
                {allProducts.map((product) => {
                  return (
                    <MenuItem
                      value={product.product_id}
                      key={product.product_id}
                    >
                      {product.product_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        )}

        <br />
        <button
          onClick={() => {
            onSave(name, minAmount, maxAmount, product);
            toggleModal();
          }}
        >
          Save
        </button>
        <button onClick={toggleModal}>Close modal</button>
      </Modal>
    </>
  );
};

export default Button;

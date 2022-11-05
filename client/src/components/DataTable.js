import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import { AppContext } from "../App";
import { addProductByCustomer } from "../utils/api";

const classes = {
  parent: {},
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    width: 50,
  },
};

const DataTable = ({ rows, columns, title, type }) => {
  const { selectedCustomer, setSelectedCustomer } = useContext(AppContext);

  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  const onChangeAmount = async (e, row, type) => {
    if (type === "min") {
      setMinAmount(e.target.value);
    } else {
      setMaxAmount(e.target.value);
    }
  };

  const onSaveProduct = async (row) => {
    try {
      await addProductByCustomer(
        selectedCustomer?.customer_id,
        row.product_id,
        parseInt(minAmount),
        parseInt(maxAmount)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const renderColumns = (row, column) => {
    if (column === "") {
      return (
        <button type="submit" onClick={() => onSaveProduct(row)}>
          Save
        </button>
      );
    } else if (column === "MINAMOUNT") {
      return (
        <input
          type="number"
          value={row.min_amount}
          onChange={(e) => onChangeAmount(e, row, "min")}
        />
      );
    } else if (column === "MAXAMOUNT") {
      return (
        <input
          type="number"
          value={row.max_amount}
          onChange={(e) => onChangeAmount(e, row, "max")}
        />
      );
    } else {
      return row[column.toLowerCase()];
    }
  };

  const onClickCustomer = (e, row) => {
    type === "customer" && setSelectedCustomer(row);
  };

  return (
    <>
      {title}
      <TableContainer style={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column.toUpperCase()}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row[`${type}_id`]}>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={`${row[`${type}_id`]}_${column}`}
                        onClick={(e) => onClickCustomer(e, row)}
                      >
                        {renderColumns(row, column)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;

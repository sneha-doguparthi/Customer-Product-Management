import React, { useContext } from "react";
import Button from "./Button";
import DataTable from "./DataTable";
import { AppContext } from "../App";
import { addCustomer } from "../utils/api";

const Customers = () => {
  const { customers, setCustomers } = useContext(AppContext);

  const onSave = async (name, minAmount, maxAmount) => {
    try {
      const customerResp = await addCustomer(name, minAmount, maxAmount);
      customerResp &&
        setCustomers([
          ...customers,
          {
            customer_name: name,
            customer_id: customerResp.customerId,
            minAmount,
            maxAmount,
          },
        ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button title="+" onSave={onSave} type="customers" />
      <br />
      <DataTable
        title="Customers"
        rows={customers}
        columns={["Customer_name"]}
        key="Customers"
        type="customer"
      />
    </>
  );
};

export default Customers;

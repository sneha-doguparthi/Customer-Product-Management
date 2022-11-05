const SERVICE_URL = "http://localhost:3001/api";

const get = async (path) => {
  try {
    const url = new URL(path, SERVICE_URL);
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (e) {
    console.error(e);
    return Promise.reject(new Error("Failed to get data"));
  }
};

const post = async (path, body) => {
  try {
    const url = new URL(path, SERVICE_URL);
    const response = await fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      return Promise.reject(new Error(error.msg));
    }
  } catch (e) {
    console.error(e);
    return Promise.reject("Failed to post data");
  }
};

export const getAllCustomers = async () => {
  try {
    return await get(`/customers`);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addCustomer = async (name, min, max) => {
  try {
    return await post(`/customers/addCustomer`, {
      customerName: name,
      minAmount: min,
      maxAmount: max,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProductsByCustomer = async (customerId) => {
  try {
    return await get(`/customers/${customerId}`);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addProductByCustomer = async (customerId, productId, min, max) => {
  try {
    return await post(`/customers/${customerId}`, {
      customerId: customerId,
      productId: productId,
      minAmount: min,
      maxAmount: max,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProducts = async () => {
  try {
    return await get(`/products`);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addProduct = async (name) => {
  try {
    return await post(`/products/addProduct`, {
      productName: name,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

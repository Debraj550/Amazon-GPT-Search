import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/get-all-products/"
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(response);
        setAllProduct(data);
        setFilteredProduct(data);
      } else {
        console.log(
          "Failed to fetch data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log("reloading data");
  }, []);

  const updateAllProduct = (data) => {
    setAllProduct(data);
    setFilteredProduct(data);
  };
  const updateFilteredProduct = (filteredData) => {
    setFilteredProduct(filteredData);
  };

  const filterProducts = (searchValue) => {
    if (!searchValue) {
      updateFilteredProduct(allProduct);
    } else {
      const filteredData = allProduct.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      updateFilteredProduct(filteredData);
    }
  };

  return (
    <ProductContext.Provider
      value={{ allProduct, updateAllProduct, filteredProduct, filterProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

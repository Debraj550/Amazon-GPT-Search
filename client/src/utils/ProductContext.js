import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/read-csv");
      const data = await res.json();
      setAllProduct(JSON.parse(data));
      setFilteredProduct(JSON.parse(data));
    } catch (err) {
      console.log(err);
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

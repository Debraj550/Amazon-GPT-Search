import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();
export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [allProduct, setAllProduct] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/read-csv");
      const data = await res.json();
      setAllProduct(JSON.parse(data));
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
  };
  console.log(allProduct);
  return (
    <ProductContext.Provider value={{ allProduct, updateAllProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

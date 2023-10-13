import { useEffect, useState } from "react";

const useGetAllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/read-csv");
      const data = await res.json();
      setAllProducts(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return allProducts;
};

export default useGetAllProducts;

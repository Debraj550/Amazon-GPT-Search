import "./App.css";
import Header from "./Components/Header";
import ProductListing from "./Components/ProductListing";
import useGetAllProducts from "./utils/useGetAllProducts";

function App() {
  const allProduct = useGetAllProducts();
  console.log(allProduct);
  return (
    <div className="App">
      <Header />
      <ProductListing allProduct={allProduct} />
    </div>
  );
}

export default App;

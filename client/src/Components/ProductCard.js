import React from "react";

const ProductCard = (props) => {
  const { product } = props;
  console.log(product);
  return (
    <div className="mb-6 mt-2 py-2 px-1 flex overflow-hidden h-40 items-center bg-gray-100">
      <div className="image w-3/12">
        <img className="" src={product.image} alt={`${product.name}`}></img>
      </div>
      <div className="details w-9/12 ml-4 mr-2 px-2 h-full mt-6">
        <h1 className="font-semibold ">{product.name}</h1>
        <div className="flex text-sm gap-4">
          <p className="font-bold text-red-500">
            {product.ratings ? product.ratings : 0}/5
          </p>
          <p className="text-blue-500 font-bold">{product.no_of_ratings}</p>
        </div>
        <div>
          {product.discount_price ? (
            <h1>{product.discount_price}</h1>
          ) : product.actual_price ? (
            <h1>{product.actual_price}</h1>
          ) : (
            <h1>Not Available</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

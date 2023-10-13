import React from "react";

const ProductCard = (props) => {
  const { product } = props;

  return (
    <div className="mb-6 mt-2 py-4 px-1 flex overflow-hidden h-40 items-center w-9/12 ">
      <div className="image w-3/12 bg-gray-100 h-full flex items-center">
        <img src={product.image} alt={`${product.name}`}></img>
      </div>
      <div className="details w-9/12 ml-4 mr-2 px-2 h-full mt-6 flex flex-col">
        <h1 className="font-semibold ">{product.name}</h1>

        <div className="h-3/6 flex flex-col justify-end">
          <div className="flex text-sm gap-3">
            <p className="font-bold text-red-500">
              {product.ratings ? product.ratings : 0}/5
            </p>
            <p className="text-blue-500 font-bold">{product.no_of_ratings}</p>
          </div>
          {product.discount_price ? (
            <div className="flex gap-2 items-end">
              <h1 className="font-bold text-xl">{product.discount_price}</h1>
              <strike>{product.actual_price}</strike>
            </div>
          ) : product.actual_price ? (
            <h1 className="font-bold text-xl">{product.actual_price}</h1>
          ) : (
            <h1>Not Available</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

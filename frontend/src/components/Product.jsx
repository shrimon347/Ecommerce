/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from "react-router-dom";

function Product({product}) {
    const {_id, image,description,brand, price, category, name,rating, numReviews} = product;
    
  return (


      <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
        <Link className="block relative h-48 rounded overflow-hidden" to={`/product/${_id}`}>
          <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={image}/>
        </Link>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{category}</h3>
          <Link  to={`/product/${_id}`}>
            <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
        </Link>
          <p className="mt-1"><strong>{brand}</strong></p>
          <p className="mt-1">${price}</p>
          <p className='mt-1'>{rating} froms {numReviews} Reviews</p>
        </div>
      </div>
  )
}

export default Product

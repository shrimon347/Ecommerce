/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import Product from '../components/Product';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction';
import Loader from '../components/Loader';


function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  
  const {error, loading, products} = productList
  
  useEffect (() => {
    dispatch(listProducts())
  }, [dispatch])


  const Products = products.length > 0 && products.map((product)=>(<Product key={product._id} product={product}/>));
  return (

    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
      <h1 className='my-5 text-lg'>Latest Products</h1>
      
      {loading ? <Loader />
      : error ? <><div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-300" role="alert">
      <span className="font-medium">{error}!</span> Change a few things up and try submitting again.
    </div></>
      :<div className="flex flex-wrap -m-4">
        {Products}
        </div>
      }
     
      </div>
    </section>
    
  )
}

export default HomeScreen

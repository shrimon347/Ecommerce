/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../action/cartActions';

function CartScreen() {

    const {id} = useParams()
    const location = useLocation()
    const navigate= useNavigate()
    const qty = location.search ? Number(location.search.split('=') [1]) : 1
    //console.log('qty', qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    // console.log("cartItems", cartItems);

    useEffect(() => {
        if(id){
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])
 
   const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
   }

   const checkOutHandler = () => {
      navigate('/login?redirect=/shipping')
   }
   const c = '<---'
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Shopping Cart</h1>
      <div className="flex flex-wrap ">

        {cartItems.length === 0 ? (<><div className=" my-10 text-l  text-blue-700 rounded-lg " role="alert">
  <span className="font-bold ">Your Cart is Empty</span> Please add few things to the cart and try submitting again. <br />
  <Link className='font-bold text-black text-2xl hover:text-blue-800' to='/'>{c} Go Back</Link> 
</div></>):(
            <>
          
            <table className=" lg:w-1/2 table-auto w-full text-left whitespace-no-wrap h-full p-8 rounded">
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Image</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Price</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Quantity</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Delete</th>
              
            </tr>
          </thead>
          <tbody>
          
            {cartItems.map(item => (
            <tr key={item.product}>
            <td  className="py-2 border-t-2"><img alt={item.name} className="lg:w-20 w-full  lg:h-auto md:h-auto object-cover object-center rounded" src={item.image} /></td>
            <td className="px-4 py-3 border-t-2"><Link to={`/product/${item.product}`}>{item.name}</Link></td>
            <td className="px-4 py-3 border-t-2">${item.price}</td>
            <td className="px-4 py-3 border-t-2">{item.countInStock > 0 && (
                        <div className="flex  items-center">
                        <span className="mr-3">Quantity</span>
                        <div className="relative">
                          <select value={item.qty} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10" onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                            {
                              [...Array(item.countInStock).keys()].map((x) =>(
                                <option key={x + 1} value={x + 1}>{x + 1 }</option>
                              ))
                            }
                          </select>
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      )}</td>
                <td className="px-4 py-3 border-t-2 "><button onClick={() => removeFromCartHandler(item.product)} className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"><FaRegTrashAlt /></button></td>
            
            </tr>
        
            ))}
           </tbody>
              
              
          </table>

      
            </>
        )}
        <div className="lg:w-1/3 m-10 p-12 md:w-2/1  bg-white rounded-lg flex flex-col md:ml-auto w-full md:py-8 mt-10 md:mt-0 relative z-10 shadow-md">
      <h2 className="text-gray-900 text-4xl my-10 mb-1 font-medium title-font">Subtotal ({cartItems.reduce((acc,item) => acc + item.qty, 0 )}) Items </h2>
      <p className="leading-relaxed mb-5 text-3xl text-gray-600">${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
      
      <button onClick={checkOutHandler} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={cartItems.length === 0}>PROCEED TO CHECKOUT</button>
     
    </div>
      </div>
      
    </div>
  </section>
  )
}

export default CartScreen

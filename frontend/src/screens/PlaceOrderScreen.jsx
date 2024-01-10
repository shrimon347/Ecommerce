import React, { useEffect } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../action/orderActions';
import {ORDER_CREATE_RESET} from '../constants/orderConstants'

const PlaceOrderScreen = () => {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.082) * cart.itemsPrice).toFixed(2)
    
    cart.totalPrice = Number( Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
        if (success){
            navigate(`/order/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})
        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems : cart.cartItems,
            shippingAddress : cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice : cart.taxPrice,
            totalPrice : cart.totalPrice
        }))
    }

  return (
   <>
    <CheckoutSteps step1 step2 step3 step4 />
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
    
    
    
        <div className="flex  flex-wrap">
            

            {cart.cartItems.length === 0 ? (<><div className=" my-10 text-l  text-blue-700 rounded-lg " role="alert">
         <span className="font-bold ">Your Cart is Empty</span> Please add few things to the cart and try submitting again. <br />
         <Link className='font-bold text-black text-2xl hover:text-blue-800' to='/'>Go Back</Link> 
            </div></>):(
            
            <>
            <div className="lg:w-1/2 table-auto w-full text-left whitespace-no-wrap h-full rounded">
            <p className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Order Items</p>
            <table >
          <thead>
            <tr>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Image</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Total</th>
              
            </tr>
          </thead>
          <tbody>
          
            {cart.cartItems.map((item, index) => (
            <tr key={index}>
            <td  className="py-2 border-t-2"><img alt={item.name} className="lg:w-20 w-full  lg:h-auto md:h-auto object-cover object-center rounded" src={item.image} /></td>
            <td className="px-4 py-3 border-t-2"><Link to={`/product/${item.product}`}>{item.name}</Link></td>
            
                <td className="px-4 py-3 border-t-2 ">{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)} </td>
            
            </tr>
        
            ))}
           </tbody>
              
              
          </table>
          <div className='mt-10'>
                <div>
                    <p className="sm:text-4xl  text-3xl font-medium title-font mb-2 text-gray-900">Shipping Address</p>
   
                    <p className='my-4'><strong>Shipping</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} - {' '} {cart.shippingAddress.postalCode}, {' '} {cart.shippingAddress.country} </p>
                </div>

                <div className='my-5'>
                    <p className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Payment Method</p>
   
                  <p className='my-4'><strong>Method :</strong> {cart.paymentMethod} </p>
                </div>
            </div>

          </div>
          </>
            )}
            <div className=" lg:w-2/5  p-12 md:w-2/1  bg-white rounded-lg flex flex-col md:ml-auto  md:py-8 mt-10 md:mt-0 relative z-10 shadow-md">
             <h2 className="text-gray-900 text-4xl my-10 mb-1 font-medium title-font">Order Summary </h2>
            <div className='flex space-x-2 my-5'>
                <p>Items : </p>
                <p>${cart.itemsPrice} </p>
            </div>
            <div className='flex space-x-2 my-5'>
                <p>Shipping : </p>
                <p>${cart.shippingPrice} </p>
            </div>
            <div className='flex space-x-2 my-5'>
                <p>Tax : </p>
                <p>${cart.taxPrice} </p>
            </div>
            <div className='flex space-x-2 my-5'>
                <p>Total : </p>
                <p>${cart.totalPrice} </p>
            </div>
            {error && <><div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-300" role="alert">
            <span className="font-medium">{error}!</span> Change a few things up and try submitting again.
            </div></>}
            <button onClick={placeOrder} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" disabled={cart.cartItems === 0}>Place Order  </button>
     
        </div>
            
     </div>
      
    </div>
  </section>
   
   </>
  )
}

export default PlaceOrderScreen
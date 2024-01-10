import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../action/cartActions'

const PaymentScreen = () => {

    const cart = useSelector (state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const navigate = useNavigate()
    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <>
    <section className="text-gray-600 body-font ">
        

<div className=" bg-gray-300">

<div className="container px-5 py-24 mx-auto">

<div className=" bg-white rounded-lg p-8 flex flex-col mx-auto lg:w-1/2 md:w-2/3  mt-10 md:mt-0 shadow-md">
<CheckoutSteps step1 step2 step3/>
  <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Select Payment Method</h2>
 
  <form action="" onSubmit={submitHandler}>
  <div className="relative mb-4">
    
    <input  onChange={(e) => setPaymentMethod(e.target.value)}  type="radio" id="paypal" name="payemntMethod" checked className="bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
    <label  className="leading-7 text-sm mx-3 text-gray-600">PayPal or Credit card</label>
  </div>
  
  <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Continue</button>
  </form>

</div>
</div>
</div>
</section>

</>
  )
}

export default PaymentScreen
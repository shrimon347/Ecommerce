import React, { useState } from 'react';
import Loader from '../components/Loader';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../action/cartActions'


function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address) 
    const [city, setCity] = useState(shippingAddress.city) 
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode) 
    const [country, setCountry] = useState(shippingAddress.country)

    

    // const location = useLocation()
    const navigate= useNavigate()
//     const redirect = location.search ? location.search.split('=')[1] : '/'

//    const userRegister = useSelector(state => state.userRegister)

//    const {error, loading, userInfo} = userRegister

//    useEffect(() => {
//     if(userInfo) {
//       navigate(redirect)
//     }
//    }, [navigate, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
       
    }

  return (
    <>
        <section className="text-gray-600 body-font ">
            

  <div className=" bg-gray-300">

  <div className="container px-5 py-24 mx-auto">
    
    <div className=" bg-white rounded-lg p-8 flex flex-col mx-auto lg:w-1/2 md:w-2/3  mt-10 md:mt-0 shadow-md">
    <CheckoutSteps step1 step2/>
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Shipping</h2>
      {/* {message && <><div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-300" role="alert">
  <span className="font-medium">{message}!</span> Change a few things up and try submitting again.
</div></>} */}
      {/* {error && <><div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-300" role="alert">
  <span className="font-medium">{error}!</span> Change a few things up and try submitting again.
</div></>} */}
{/* {loading && <Loader />} */}
      <form action="" onSubmit={submitHandler}>
      <div className="relative mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <input required onChange={(e) => setAddress(e.target.value)} placeholder='Enter the address' value={address ? address : ''} type="text" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
        <input required onChange={(e) => setCity(e.target.value)} placeholder='Enter the city name' value={city ? city : ''} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label required htmlFor="postalcode" className="leading-7 text-sm text-gray-600">Postacode</label>
        <input onChange={(e) => setPostalCode(e.target.value)} placeholder='Enter Postalcode' type="text" id="postalcode" value={postalCode ? postalCode : ''} name="postalcode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="country" className="leading-7 text-sm text-gray-600">Country</label>
        <input required onChange={(e) => setCountry(e.target.value)} placeholder='Enter country name' type="text" id="country" value={country ? country : ''} name="country" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
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

export default ShippingScreen
import React from 'react'
import { Link } from "react-router-dom"


const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <>
    <div className='flex'>
        <div className='p-5 m-auto'>
           {step1 ? (
             <strong><Link to='/login'> Login</Link></strong>
           ): (
            <Link style={{pointerEvents: 'none', textDecoration: 'none'}} onClick={event => event.preventDefault()}> Login</Link>
           )}
        </div>
        <div  className='p-5 m-auto'>
           {step2 ? (
             <strong><Link to='/shipping'> Shipping</Link></strong>
           ): (
             <Link style={{pointerEvents: 'none', textDecoration: 'none'}} onClick={event => event.preventDefault()}> Shipping</Link>
           )}
        </div>
        <div  className='p-5 m-auto'>
           {step3 ? (
             <strong><Link to='/payment'> Payment</Link></strong>
           ): (
          <Link style={{pointerEvents: 'none', textDecoration: 'none'}} onClick={event => event.preventDefault()}> Payment</Link>
           )}
        </div>
        <div  className='p-5 m-auto'>
           {step4 ? (
             <strong><Link to='/placeorder'> Place Order</Link></strong>
           ): (
          <Link style={{pointerEvents: 'none', textDecoration: 'none'}} onClick={event => event.preventDefault()}> Place Order</Link>
           )}
        </div>
    </div>
    
    
    </>
  )
}

export default CheckoutSteps
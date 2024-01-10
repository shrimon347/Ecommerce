/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login, register } from '../action/userAction'
import Loader from '../components/Loader';

function RegisterScreen() {
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate= useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'

   const userRegister = useSelector(state => state.userRegister)

   const {error, loading, userInfo} = userRegister

   useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
   }, [navigate, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage("Password do no match")
        } else {
            dispatch(register(name,email, password ))
        }
       
    }

  return (
    <>
        <section className="text-gray-600 body-font ">
            

  <div className=" bg-gray-300">

  <div className="container px-5 py-24 mx-auto">
    <div className=" bg-white rounded-lg p-8 flex flex-col mx-auto lg:w-1/2 md:w-2/3  mt-10 md:mt-0 shadow-md">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Register</h2>
      {message && <><div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-300" role="alert">
  <span className="font-medium">{message}!</span> Change a few things up and try submitting again.
</div></>}
      {error && <><div className="p-4 mb-4 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-gray-300" role="alert">
  <span className="font-medium">{error}!</span> Change a few things up and try submitting again.
</div></>}
{loading && <Loader />}
      <form action="" onSubmit={submitHandler}>
      <div className="relative mb-4">
        <label htmlFor="text" className="leading-7 text-sm text-gray-600">Name</label>
        <input required onChange={(e) => setName(e.target.value)} placeholder='Enter Name' value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input required onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label required htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' type="password" id="password" value={password} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Confirm Password</label>
        <input required onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Password' type="password" id="password" value={confirmPassword} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      
      <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
      </form>

      <p className='my-5'>Have an account ? <Link className='font-medium' to={redirect ?  `/login?redirect=${redirect}`: '/login'}>Sign In</Link>  </p>
    </div>
  </div>
  </div>
</section>
    
    </>
  )
}

export default RegisterScreen
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { logout } from '../action/userAction'

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()
  const logoutHandeler = () => {
    dispatch(logout())
  }

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className=" container mx-auto flex flex-row justify-between p-5">
        <div>
          <Link to="/" className=" font-semibold text-2xl p-1 cursor-pointer">
            ShopME
          </Link>
        </div>

        <nav className="hidden md:flex gap-8 font-medium p-1 text-lg">
         
          <Link to='/' className="mr-5 hover:text-[#539165] transition-all cursor-pointer">Home</Link>
        <Link to='/product' className="mr-5 hover:text-[#539165] transition-all cursor-pointer">Product</Link>
      <Link to='/cart' className="mr-5 hover:text-[#539165] transition-all cursor-pointer flex gap-2"> Cart <BiCart className="mt-1 "/> </Link>
      {userInfo ? (<>
        <Link  to='/profile'  className="mr-5 hover:text-[#539165] transition-all cursor-pointer">{userInfo.name}</Link>
        <Link onClick={logoutHandeler}  className="mr-5 hover:text-[#539165] transition-all cursor-pointer">Logout</Link>
        </>
      ) : (
        <Link  to='/login'  className="mr-5 hover:text-[#539165] transition-all cursor-pointer">Login</Link>
      )}
      </nav>

        <div className="flex md:hidden" onClick={handleChange}>
          <div className=" p-2">
            <AiOutlineMenu size={22} />
          </div>
        </div>
      </div>
      <div
        className={` ${
          menu ? "translate-x-0" : "-translate-x-full"
        } md:hidden flex flex-col absolute bg-[#ffffff] left-0 top-20 font-medium text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 `}
      >
        <Link
          to="/"
          duration={500}
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="/product"
          duration={500}
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Cart
        </Link>
        <Link
          to="/login"
          duration={500}
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Login
        </Link>
        <Link
          to="/reviews"
          duration={500}
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Reviews
        </Link>
        <Link
          to="/contact"
          duration={500}
          className="hover:text-[#539165] transition-all cursor-pointer"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
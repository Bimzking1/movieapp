/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect }  from 'react'
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiOutlineBarsArrowUp } from "react-icons/hi2";
import style from './../components/style/style.module.css'
import { Link } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';

const NavbarLogin = () => {
  const [navSize, setnavSize] = useState("auto");
  const [navColor, setnavColor] = useState("transparent");
  
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor("white") : setnavColor("transparent");
    window.scrollY > 10 ? setnavSize("auto") : setnavSize("auto");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  
  const [open, setOpen] = useState(false);
  
  const openNavbar = () => {
    if (open == false){
      setOpen(true)
    } else {
      setOpen(false)
    }
    
    if (navColor == "transparent"){
      setnavColor("white")
    }
  }

  return (
    <div
      className='shadow w-full fixed flex items-center justify-center z-50 top-0'
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: '1s ease-in'
      }}
    >
      <ToastContainer />
      <div className='w-full xl:w-[1280px]'>
        <div className='w-full md:flex items-center justify-between py-4 md:px-10 px-7'>

          {/* Logo */}
          <div onClick={()=>openNavbar()} className='font-bold text-2xl cursor-pointer flex items-center gap-2 z-50'>
            <Link to="/" className={`${style.card}`}>
              {/* <img src={DroNeeds} className='h-[40px]' alt="Logo Back"/>
              <img src={DroNeedsMirror} className={`${style.imgTop} h-[40px]`} alt="Logo Front"/> */}
              Logo
            </Link>
          </div>

          {/* Menu icon */}
          <div onClick={()=>openNavbar()} className='absolute right-8 top-5 cursor-pointer md:hidden w-7 h-7'>
            {
              open ? <HiOutlineBarsArrowUp/> : <HiBarsArrowDown/>
            }
          </div>

          {/* Linked items */}
          <div 
            className={`
              md:hidden
              flex md:items-center md:pb-0 pb-4 absolute md:static 
              left-0 w-full z-0
              md:w-auto md:pl-0 px-8
              ${open ? 'top-16' : 'top-[-490px]'}
            `}
            style={{
              backgroundColor: navColor,
              transition: '1s ease-in'
            }}
          >
            <div className='text-xl mt-6 md:items-center md:text-center md:gap-4 flex flex-col md:flex-row md:ml-8 md:my-0 font-semibold'>
              <Link to="/" className='hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 text-gray-800 hover:text-blue-400 duration-500'>
                <IoHomeOutline/>
              </Link>
            </div>
            <hr/>
          </div>

          <div 
            className={`
              hidden
              md:flex md:items-center md:pb-0 pb-4 absolute md:static 
              left-0 w-full z-0
              md:w-auto md:pl-0 px-8
              ${open ? 'top-16' : 'top-[-490px]'}
            `}
            style={{
              transition: '1s ease-in'
            }}
          >
            <div className='text-xl mt-6 md:items-center md:text-center md:gap-4 flex flex-col md:flex-row md:ml-8 md:my-0 font-semibold'>
              <Link to="/" className={`${navColor === 'transparent' ? 'text-[#262626]' : 'text-gray-800'} hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 hover:text-blue-400 duration-500`}>
                <IoHomeOutline/>
              </Link>
            </div>
            <hr/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default NavbarLogin
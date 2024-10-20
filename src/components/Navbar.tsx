/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect }  from 'react'
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiOutlineBarsArrowUp } from "react-icons/hi2";
import style from './../components/style/style.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Logo from './../assets/tmdb.png'

const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [navSize, setnavSize] = useState<string>("auto");
  const [navColor, setnavColor] = useState<string>("transparent");
  const [isSessionDeleted, setIsSessionDeleted] = useState<boolean>(false);
  
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

  const deleteSession = async () => {
    const options = {
      method: 'DELETE',
      url: 'https://api.themoviedb.org/3/authentication/session',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODE1OTg0YjlhZWQyOWVkMjYzOWJkZTQxOGQ3YzU2YiIsIm5iZiI6MTcyOTQyMjI1Mi4wMTcxNzUsInN1YiI6IjYzNDNhN2VmM2M4ODdkMDA3YzkzOWExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rGK1WD1XqKK4YPFt-u3EyFwVJ6f3tvqFuYvUUH3nZW0`
      },
      data: {
        session_id: localStorage.getItem('session_id')
      }
    };

    try {
      await axios.request(options);
      localStorage.removeItem('session_id')
      setIsSessionDeleted(!isSessionDeleted)
      toast.success('Session deleted successfully!');
    } catch {
      toast.error('Error deleting session');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('session_id') !== null) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('session_id') !== null) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [isSessionDeleted])

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
              <img src={Logo} className='h-[40px] rounded-full hover:scale-110 duration-300' alt="Logo Back"/>
            </Link>
          </div>

          {/* Menu icon */}
          <div onClick={()=>openNavbar()} className='absolute right-8 top-5 cursor-pointer md:hidden w-[30px] h-auto flex justify-center items-center'>
            {
              open ? <HiOutlineBarsArrowUp className='w-full h-auto'/> : <HiBarsArrowDown className='w-full h-auto'/>
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
              <a href="#home" className='hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 text-gray-800 hover:text-blue-400 duration-500'>
                HOME
              </a>
              <a href="#nowplaying" className='hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 text-gray-800 hover:text-blue-400 duration-500'>
                NOW PLAYING
              </a>
              <a href="#popular" className='hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 text-gray-800 hover:text-blue-400 duration-500'>
                POPULAR
              </a>
              <Link to="/profile" className='hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 text-gray-800 hover:text-blue-400 duration-500'>
                PROFILE
              </Link>
              {
                isLogin ?
                  <div
                    onClick={() => deleteSession()}
                    className='hover:bg-gray-200 md:hover:bg-gray-100 rounded-full px-4 py-2 md:px-4 mb-4 md:mb-0 text-gray-800 hover:text-blue-400 duration-500 cursor-pointer'
                  >
                    Logout
                  </div>
                  :
                  <Link to="/login" className='hover:bg-gray-200 md:hover:bg-gray-100 rounded-full px-4 py-2 md:px-4 mb-4 md:mb-0 text-gray-800 hover:text-blue-400 duration-500'>
                    Login
                  </Link>
              }
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
              <a href="#home" className={`${navColor === 'transparent' ? 'text-[#F5F5F5]' : 'text-gray-800'} hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 hover:text-blue-400 duration-500`}>
                HOME
              </a>
              <a href="#nowplaying" className={`${navColor === 'transparent' ? 'text-[#F5F5F5]' : 'text-gray-800'} hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 hover:text-blue-400 duration-500`}>
                NOW PLAYING
              </a>
              <a href="#popular" className={`${navColor === 'transparent' ? 'text-[#F5F5F5]' : 'text-gray-800'} hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 hover:text-blue-400 duration-500`}>
                POPULAR
              </a>
              <Link to="/profile" className={`${navColor === 'transparent' ? 'text-[#F5F5F5]' : 'text-gray-800'} hover:bg-gray-200 md:hover:bg-gray-100 rounded-full py-2 px-4 md:px-4 mb-2 md:mb-0 hover:text-blue-400 duration-500`}>
                PROFILE
              </Link>
              {
                isLogin ?
                  <div
                    onClick={() => deleteSession()}
                    className={`text-gray-100 bg-[#8d1010] hover:bg-[#a71919] hover:scale-110 rounded-full px-4 py-2 md:px-4 mb-4 md:mb-0 duration-500 text-sm cursor-pointer`}
                  >
                    Logout
                  </div>
                  :
                  <Link to="/login" className={`${navColor === 'transparent' ? 'text-gray-100' : 'text-gray-800'} bg-[#f6c900] hover:bg-[#ffd723] hover:scale-110 rounded-full px-4 py-2 md:px-4 mb-4 md:mb-0 duration-500 text-sm text-gray-800`}>
                    Login
                  </Link>
              }
            </div>
            <hr/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar
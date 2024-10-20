import { AiOutlineInstagram } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { AiOutlineYoutube } from 'react-icons/ai';
import Logo from './../assets/tmdb.png'

const Footer = () => {
  return (
    <div className='w-full flex items-center justify-center bg-gray-800 z-50'>
      <div className='bg-gray-800 w-full xl:w-[1280px] text-gray-100 text-sm text-center md:text-left md:py-8 md:px-8 pb-8'>
        <div className='w-full md:flex'>

          <div className='flex justify-center items-center md:items-start flex-col w-full md:w-1/4 py-2 pt-8 md:pt-2 px-2 pl-4 lg:w-2/5'>
            <a href="#home" className='w-4/5'>
              <img
                src={Logo}
                className='rounded-full cursor-pointer hover:scale-110 duration-300'
              />
            </a>
            <div className='text-lg md:text-sm my-8 px-4 md:px-0 lg:w-4/5'>
              MovieApp is the largest movie publisher company
              and stream service providers in Indonesia.
              We help our customers to fullfilled their
              satisfaction.
            </div>
            <div className='flex justify-center md:justify-start py-4 gap-4'>
              <a href='https://www.instagram.com/' target="_blank" className='w-[40px] md:w-[30px]'>
                <AiOutlineInstagram style={{ width: '100%', height: '100%' }}/>
              </a>
              <a href="https://www.facebook.com/" target="_blank" className='w-[40px] md:w-[30px]'>
                <BsFacebook style={{color: "#ffffff", width: '100%', height: '100%'}} />
              </a>
              <a href="https://www.youtube.com/" target="_blank" className='w-[40px] md:w-[30px]'>
                <AiOutlineYoutube style={{color: "#ffffff", width: '100%', height: '100%' }} />
              </a>
            </div>
          </div>

          <div className='md:w-1/4 lg:w-1/5 py-2 px-2'>
            <div className='font-bold text-xl mb-2'>
              Services
            </div>
            <div className='md:py-1'>
              Movie Recommendations
            </div>
            <div className='md:py-1'>
              Movie Streams
            </div>
            <div className='md:py-1'>
              Movie Updates
            </div>
          </div>

          <div className='md:w-1/4 lg:w-1/5 py-2 px-2'>
            <div className='font-bold text-xl mb-2'>
              Discover
            </div>
            <div className='md:py-1'>
              Best IMDB
            </div>
            <div className='md:py-1'>
              Oscar Winners
            </div>
            <div className='md:py-1'>
              Best Rated Moview
            </div>
            <div className='md:py-1'>
              IMAX 2024
            </div>
            <div className='md:py-1'>
              Community
            </div>
            <div className='md:py-1'>
              Hobbies
            </div>
          </div>

          <div className='md:w-1/4 lg:w-1/5 py-2 px-2'>
            <div className='font-bold text-xl mb-2'>
              Products
            </div>
            <div className='md:py-1'>
              Movies
            </div>
            <div className='md:py-1'>
              3D Glasses
            </div>
            <div className='md:py-1'>
              VR Test
            </div>
          </div>

        </div>
        <hr className='mt-8'/>
        <div className='text-center md:flex gap-8 text-xs mt-8 lg:px-4'>
          <div className='mb-2'>
            © MovieApp 2024. All Rights Reserved
          </div>
          <div className='font-bold mb-2 hidden md:block'>
            About Us
          </div>
          <div className='font-bold mb-2 hidden md:block'>
            User Agreement
          </div>
          <div className='font-bold mb-2 hidden md:block'>
            Privacy Policy
          </div>
          <div className='font-bold mb-2 hidden md:block'>
            Terms of Services
          </div>
          <div className='font-bold mb-2 hidden md:block'>
            Cookie Policy
          </div>
          <div className='font-bold mb-2 hidden md:block'>
            Copyright Policy
          </div>
          <div className='font-bold mb-2 hidden md:block'>
            Brand Policy
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
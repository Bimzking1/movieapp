import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCollection from './../assets/movieCollection.jpg'
import NowPlaying from '../components/NowPlaying';
import Popular from '../components/Popular';

const Home: React.FC = () => {

  const myStyle = {
    backgroundImage:
      `url(${MovieCollection})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>  
      <div id="home"></div>
      <Navbar/>

      <div className='flex w-full flex-col justify-center z-0'>
        <div 
          style={myStyle}
          className='w-full flex flex-col items-center justify-center h-screen'
        >

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-85"></div>
          <div className='relative z-10 text-center lg:flex lg:gap-4'>
            <div className='text-center rounded-lg text-gray-100 text-6xl pt-4 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]'>
                Explore
            </div>
            <div className='text-center rounded-lg text-gray-100 text-6xl pt-4 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]'>
                Movies
            </div>
            <div className='text-center rounded-lg text-gray-100 text-6xl pt-4 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]'>
                Worldwide
            </div>
          </div>
          <div className='relative z-10 mt-4 md:mt-2'>
            <div className='text-center rounded-lg text-gray-100 text-xl pt-4 mx-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]'>
                MovieApp gives you every movie you needed.
            </div>
            <div className='hidden md:flex md:justify-center md:items-center text-center rounded-lg text-gray-100 text-xl mx-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]'>
                Best quality from all over the world.
            </div>
          </div>
        </div>
      </div>
      
      <div id="nowplaying" className=' bg-gray-100 w-full flex items-center justify-center'>
        <NowPlaying/>
      </div>
      
      <div id="popular" className=' bg-gray-100 w-full flex items-center justify-center'>
        <Popular/>
      </div>

      <Footer/>
    </>
  )
};

export default Home;
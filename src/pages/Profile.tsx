import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Favorite from '../components/Favorite';

const Profile: React.FC = () => {

  return (
    <>
      <Navbar/>
      
      <div id="nowplaying" className=' bg-gray-100 w-full flex items-center justify-center'>
        <Favorite/>
      </div>

      <Footer/>
    </>
  )
};

export default Profile;
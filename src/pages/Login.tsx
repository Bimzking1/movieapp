import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import NavbarLogin from '../components/NavbarLogin';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate()

//   const TMDB_API_KEY = '7815984b9aed29ed2639bde418d7c56b';
  const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODE1OTg0YjlhZWQyOWVkMjYzOWJkZTQxOGQ3YzU2YiIsIm5iZiI6MTcyOTQyMjI1Mi4wMTcxNzUsInN1YiI6IjYzNDNhN2VmM2M4ODdkMDA3YzkzOWExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rGK1WD1XqKK4YPFt-u3EyFwVJ6f3tvqFuYvUUH3nZW0';

  const getRequestToken = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
        }
      });
      return response.data.request_token;
    } catch {
      toast.error('Error getting request token');
    }
  };

  const validateWithLogin = async (requestToken: string) => {
    const options = {
      method: 'POST',
      url: 'https://api.themoviedb.org/3/authentication/token/validate_with_login',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
      },
      data: {
        username,
        password,
        request_token: requestToken
      }
    };

    try {
      const response = await axios.request(options);
      return response.data.request_token;
    } catch {
      toast.error('Error validating with login');
    }
  };

  const createSession = async (validatedToken: string) => {
    const options = {
      method: 'POST',
      url: 'https://api.themoviedb.org/3/authentication/session/new',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
      },
      data: {
        request_token: validatedToken
      }
    };

    try {
      const response = await axios.request(options);
      localStorage.setItem('session_id', response?.data?.session_id)
      toast.success('Login successful!');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch {
      toast.error('Error creating session');
    }
  };

  const handleLogin = async () => {
    const requestToken = await getRequestToken();
    if (requestToken) {
      const validatedToken = await validateWithLogin(requestToken);
      if (validatedToken) {
        await createSession(validatedToken);
      }
    }
  };

  return (
    <>
      <NavbarLogin/>
      <div className="container mx-auto p-4 w-full xl:w-[1280px] my-32">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-4">TMDB Login</h1>
        <div className='my-8'>
          <div className='font-semibold italic'>
            Credentials hint:
          </div>
          <div className='flex gap-2 justify-start items-center'>
            <div>
              username:
            </div>
            <div className='font-semibold text-lg animate-bumpy'>
              bimzking1
            </div>
          </div>
          <div className='flex gap-2 justify-start items-center'>
            <div>
              password:
            </div>
            <div className='font-semibold text-lg animate-bumpy'>
              Pbsa011200pbsa
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
      <Footer/>
    </>
  );
};

export default Login;

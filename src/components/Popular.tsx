import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MovieList } from '../interfaces/nowPlaying.interfaces';
import { FaRegHeart } from "react-icons/fa";

const Popular = () => {
  
  const [popularList, setPopularList] = useState<MovieList[]>([])
  const [startIndex] = useState<number>(0)
  const [endIndex, setEndIndex] = useState<number>(6)

  const options1 = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODE1OTg0YjlhZWQyOWVkMjYzOWJkZTQxOGQ3YzU2YiIsIm5iZiI6MTcyOTQyMjI1Mi4wMTcxNzUsInN1YiI6IjYzNDNhN2VmM2M4ODdkMDA3YzkzOWExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rGK1WD1XqKK4YPFt-u3EyFwVJ6f3tvqFuYvUUH3nZW0'
    }
  };

  const options2 = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: { language: 'en-US', page: '2' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODE1OTg0YjlhZWQyOWVkMjYzOWJkZTQxOGQ3YzU2YiIsIm5iZiI6MTcyOTQyMjI1Mi4wMTcxNzUsInN1YiI6IjYzNDNhN2VmM2M4ODdkMDA3YzkzOWExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rGK1WD1XqKK4YPFt-u3EyFwVJ6f3tvqFuYvUUH3nZW0'
    }
  };

  const fetchMovieData = async () => {
    try {
      const response1 = await axios.request(options1);
      const response2 = await axios.request(options2);

      const combinedResults: MovieList[] = [
        ...response1.data.results,
        ...response2.data.results
      ].slice(0, 30);

      setPopularList(combinedResults);
    } catch (error) {
      toast.error('Error fetching data: ' + error);
    }
  };


  const addToFavorites = async (movieId: number) => {
    if (localStorage.getItem('session_id') === null) {
      toast.error('Please login to add favorites.');
      return;
    }

    const options = {
      method: 'POST',
      url: 'https://api.themoviedb.org/3/account/{account_id}/favorite',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODE1OTg0YjlhZWQyOWVkMjYzOWJkZTQxOGQ3YzU2YiIsIm5iZiI6MTcyOTQyMjI1Mi4wMTcxNzUsInN1YiI6IjYzNDNhN2VmM2M4ODdkMDA3YzkzOWExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rGK1WD1XqKK4YPFt-u3EyFwVJ6f3tvqFuYvUUH3nZW0`
      },
      data: {
        media_type: 'movie',
        media_id: movieId,
        favorite: true
      }
    };

    try {
      await axios.request(options);
      toast.success('Movie added to favorites!');
    } catch {
      toast.error('Error adding movie to favorites');
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);
  
  return (
    <div className='w-full xl:w-[1280px] my-16 bg-gray-100'>
      <div className='text-center text-5xl font-semibold mb-16 text-gray-800'>
        Popular
      </div>
      <div className='w-full xl:w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-4'>
        {popularList?.slice(startIndex, endIndex)?.map((movie, index) => (
          <div 
            key={index} 
            className="w-full h-fit rounded-xl bg-gray-100 flex-shrink-0 cursor-pointer p-4 hover:bg-gray-300 duration-300 flex flex-col"
          >
            <div className="flex justify-center items-center relative">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                className="w-full h-auto rounded-lg"
                alt={movie?.title}
              />
              <div className="absolute top-3 right-3 bg-[#f6c900] text-xl text-[#262626] font-semibold rounded-lg px-3 py-2">
                {(movie?.vote_average)?.toFixed(1)}
              </div>
              <div
                onClick={() => addToFavorites(movie?.id)}
                className="absolute top-3 left-3 bg-gray-100 hover:bg-gray-300 text-xl text-[#262626] font-semibold rounded-lg px-2 py-2 duration-300"
              >
                <FaRegHeart className="text-red-500"/>
              </div>
            </div>
            <div className="w-full text-center text-xl xl:text-lg font-bold my-4 text-gray-800">
              {movie?.title} ({(movie?.release_date)?.slice(0,4)})
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 gap-4">
        {
          endIndex > 6 &&
            <div
              onClick={() => setEndIndex(endIndex-6)}
              className="font-semibold text-md py-2 px-8 cursor-pointer bg-gray-300 w-fit rounded-full hover:bg-gray-400 duration-300"
            >
              Show less
            </div>
        }
        {
          endIndex !== 30 &&
            <div
              onClick={() => setEndIndex(endIndex+6)}
              className="font-semibold text-md py-2 px-8 cursor-pointer bg-gray-300 w-fit rounded-full hover:bg-gray-400 duration-300"
            >
              Load more
            </div>
        }
      </div>
    </div>
  )
}

export default Popular
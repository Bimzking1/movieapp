import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MovieList } from '../interfaces/nowPlaying.interfaces';

const Favorite = () => {
  
  const [favoriteList, setFavoriteList] = useState<MovieList[]>([])

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/account/15157431/favorite/movies',
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODE1OTg0YjlhZWQyOWVkMjYzOWJkZTQxOGQ3YzU2YiIsIm5iZiI6MTcyOTQyMjI1Mi4wMTcxNzUsInN1YiI6IjYzNDNhN2VmM2M4ODdkMDA3YzkzOWExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rGK1WD1XqKK4YPFt-u3EyFwVJ6f3tvqFuYvUUH3nZW0'
    }
  };

  const fetchFavoriteMovieData = () => {
    axios
      .request(options)
      .then(function (response) {
        setFavoriteList(response?.data?.results)
      })
      .catch(function (error) {
        toast.error('Error fetching data: ', error);
      });
  }

  useEffect(() => {
    void fetchFavoriteMovieData();
  }, []);
  
  return (
    <div className='w-full xl:w-[1280px] py-8 bg-gray-100'>
      <div className='text-center text-5xl font-semibold my-16 text-gray-800'>
        Favorite Movies
      </div>
        {
          favoriteList?.length !== 0 ?
            <div className='w-full xl:w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-4'>
              {
                favoriteList?.map((movie, index) => (
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
                    </div>
                    <div className="w-full text-center text-xl xl:text-lg font-bold my-4 text-gray-800">
                      {movie?.title} ({(movie?.release_date)?.slice(0,4)})
                    </div>
                  </div>
                ))
              }
            </div>
            :
            <div className="w-full xl:w-[1280px] flex justify-center items-center mb-8">
              <div className="animate-spinner rounded-full w-24 h-24 border-8 border-b-gray-800 border-t-gray-800" />
            </div>
        }
    </div>
  )
}

export default Favorite
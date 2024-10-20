import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MovieList } from '../interfaces/nowPlaying.interfaces';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NowPlaying = () => {
  
  const [nowPlayingList, setNowPlayingList] = useState<MovieList[]>([])

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    params: {language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODE1OTg0YjlhZWQyOWVkMjYzOWJkZTQxOGQ3YzU2YiIsIm5iZiI6MTcyOTQyMjI1Mi4wMTcxNzUsInN1YiI6IjYzNDNhN2VmM2M4ODdkMDA3YzkzOWExNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rGK1WD1XqKK4YPFt-u3EyFwVJ6f3tvqFuYvUUH3nZW0'
    }
  };

  const fetchMovieData = () => {
    axios
      .request(options)
      .then(function (response) {
        setNowPlayingList(response?.data?.results)
      })
      .catch(function (error) {
        toast.error('Error fetching data: ', error);
      });
  }

  useEffect(() => {
    void fetchMovieData()
  }, [])

  function SampleNextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-gray-500 rounded-full`}
        style={{ 
          ...style, 
          display: "block", 
        }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-gray-500 rounded-full`}
        style={{ 
          ...style,
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    className: "center m-4 p-4",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    focusOnSelect: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <div className='w-full xl:w-[1280px] my-16 bg-gray-100'>
      <div className='text-center text-5xl font-semibold mb-16 text-gray-800'>
        Now Playing
      </div>
      <Slider {...settings} className='w-full'>
        {nowPlayingList?.slice(0, 6)?.map((movie, index) => (
          <div key={index} className="h-auto rounded-xl bg-gray-100 flex-shrink-0 cursor-pointer p-4 hover:bg-gray-300 duration-300">
            <div className="flex justify-center items-center relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                className="w-full h-auto rounded-lg"
                alt={movie?.title}
              />
              <div className="absolute top-3 right-3 bg-[#f6c900] text-xl text-[#262626] font-semibold rounded-lg px-3 py-2">
                {(movie?.vote_average)?.toFixed(1)}
              </div>
            </div>
            <div className="w-full text-center text-2xl font-bold my-2 text-gray-800">
              {movie?.title}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default NowPlaying
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { API_OPTIONS } from '../utils/constants';
import FloatingBox from './FloatingBox';
import { NotificationContainer } from 'react-notifications';

const MovieList = ({ title, movies, link }) => {
  const [moviesItems, setMovies] = useState(movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFloatingDiv, setShowFloatingDiv] = useState(false);
  const [showFloatingBox, setShowFloatingBox] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const API_URL = `https://api.themoviedb.org/3${link}`;

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    try {
      const response = await fetch(`${API_URL}?language=en-US&page=${page}`, API_OPTIONS);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      // Fetch trailer URL
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
      const data = await response.json();
      const trailer = data.results.find(video => video.type === 'Trailer');
      console.log(trailer)
      if (trailer) {

        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&&controls=0&loop=1&playlist=${trailer.key}`);
      }

      // Fetch movie details
      const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, API_OPTIONS);
      const detailsData = await detailsResponse.json();
      setMovieDetails(detailsData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFloatingDiv = () => {
    setShowFloatingDiv(!showFloatingDiv);
  };

  const handleCardClick = async (movieId) => {
    // Fetch trailer URL and movie details based on movie ID
    try {
      await fetchMovieDetails(movieId);
      setShowFloatingBox(true);
    } catch (error) {
      console.error('Error handling card click:', error);
    }
  };

  const closeFloatingBox = () => {
    setShowFloatingBox(false);
    setTrailerUrl('');
    setMovieDetails(null);
  };

  return (
    <div className="px-6">
      <h1 className="text-3xl font-bold py-4 text-white flex items-center">
        {title}
        <svg
          className="w-6 h-6 ml-2 mt-2 cursor-pointer hover:text-opacity-50 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
          onClick={toggleFloatingDiv}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
          ></path>
        </svg>
      </h1>

      {/* Floating div */}
      {showFloatingDiv && (
        <div className="fixed top-10 left-[10%] bg-black bg-opacity-75 p-4 shadow-lg rounded-lg z-10 w-[80vw] h-[80vh] overflow-y-auto hide-scrollbar">
          <div className='flex justify-between items-center mb-4'>
            <h1 className="text-3xl  font-bold font-serif text-white text-center w-full capitalize">{title ? title : "not available"}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className=" w-6 h-6 cursor-pointer text-white "
              onClick={toggleFloatingDiv}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          {/* Render movies dynamically in rows */}
          <div className="flex flex-wrap gap-8 justify-center">
            {moviesItems.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                title={movie.original_title || movie.original_name}
                onClick={() => handleCardClick(movie.id)}
              />
            ))}
          </div>
          <div className="flex justify-around mt-4 ">
            <button
              className="px-4 py-2 bg-red-600 bg-opacity-90 hover:bg-opacity-35 text-white rounded mr-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-7 py-2 bg-red-600 bg-opacity-90 hover:bg-opacity-35 text-white rounded"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <FloatingBox
        isOpen={showFloatingBox}
        onClose={closeFloatingBox}
        trailerUrl={trailerUrl}
        movieDetails={movieDetails}
      />

      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex gap-3">
          {moviesItems.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
              title={movie.original_title || movie.original_name}
              onClick={() => handleCardClick(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Assuming axios is used for HTTP requests
import { API_OPTIONS } from '../utils/constants';
import MovieCard from './MovieCard';
import FloatingBox from './FloatingBox';

const SearchBox = ({ onClose, onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const [showFloatingBox, setShowFloatingBox] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);

  // Close search box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current.contains(event.target) && !showFloatingBox) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, showFloatingBox]);

  // Function to fetch data from API based on query
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
      setSearchResults(response.data.results); // Assuming results are in response.data.results
      onSearchResults(response.data.results); // Pass search results to parent
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMovies();
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      // Fetch trailer URL
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
      const data = await response.json();

      const trailer = data.results.find(video => video.type === 'Trailer') || data.results[0];
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1&loop=1&playlist=${trailer.key}`);
      } else {
        setTrailerUrl(null);
      }

      // Fetch movie details
      const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, API_OPTIONS);
      const detailsData = await detailsResponse.json();
      setMovieDetails(detailsData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleCardClick = async (movieId) => {
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
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={searchRef} className="bg-black bg-opacity-50 hide-scrollbar p-4 rounded shadow-md w-[80vw] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="flex-1 w-full p-2 border bg-white bg-opacity-80 rounded-lg text-black border-gray-300  mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 bg-opacity-80 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {/* Display search results */}
        <div className="mt-4">
          {searchResults.length > 0 ? (
            <ul className="flex flex-wrap justify-center gap-5">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                  title={movie.original_title}
                  onClick={() => handleCardClick(movie.id)}
                />
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
      <FloatingBox
        isOpen={showFloatingBox}
        onClose={closeFloatingBox}
        trailerUrl={trailerUrl}
        movieDetails={movieDetails}
      />
    </div>
  );
};

export default SearchBox;

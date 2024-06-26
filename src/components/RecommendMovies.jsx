import React, { useState } from 'react';
import MovieCard from './MovieCard';
import FloatingBox from './FloatingBox';
import { API_OPTIONS } from '../utils/constants';

const RecommendMovies = ({ title, movies }) => {
    const [showFloatingBox, setShowFloatingBox] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [movieDetails, setMovieDetails] = useState(null);
    

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
        <div>
            <h2>{title}</h2>
            <div className="flex overflow-x-scroll hide-scrollbar">
                <div className="flex gap-4">
                    {movies.map((movie) => (
                        movie.vote_average !== 0 && (
                            <MovieCard
                                key={movie.id}
                                posterPath={movie.poster_path}
                                rating={movie.vote_average}
                                title={movie.original_title}
                                onClick={() => handleCardClick(movie.id)}
                            />
                        )
                    ))}
                </div>
            </div>

            {showFloatingBox && (
                <FloatingBox
                    isOpen={showFloatingBox}
                    onClose={closeFloatingBox}
                    trailerUrl={trailerUrl}
                    movieDetails={movieDetails}
                />
            )}
        </div>
    );
};

export default RecommendMovies;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShimmerThumbnail, ShimmerSectionHeader } from 'react-shimmer-effects';
import RecommendMovies from './RecommendMovies';

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gptSearch);
  const [showShimmer, setShowShimmer] = useState(true); // Initially show shimmer effect
  const isShow = useSelector((store) => store.gptSearch.showLoading);

  useEffect(() => {
    // When isShow changes (showLoading in Redux store changes)
    if (isShow) {
      setShowShimmer(true); // Show shimmer when loading starts
    } else {
      setShowShimmer(false); // Hide shimmer when loading ends
    }
  }, [isShow]);

  useEffect(() => {
    // When movieNames or movieResults change
    if (movieNames && movieResults) {
      setShowShimmer(false); // Hide shimmer once movieNames and movieResults are available
    } else {
      setShowShimmer(true); // Show shimmer if movieNames or movieResults are not available
    }
  }, [movieNames, movieResults]);

  let isMobile = window.innerWidth <= '768';


  return (
    <div className="rounded-lg mt-2 m-2  md:p-2 md:m-5 bg-black text-white">
      <div className="text-center text-3xl pt-2 mb-10">MOVIES RECOMMENDED</div>

      {showShimmer ? (

        <div className="m-2 md:m-5 md:px-24 flex flex-wrap gap-3 md:gap-4 ml-2 md:ml-16">
          {!isMobile && (<>
            <ShimmerThumbnail height={250} width={220} rounded />
            <ShimmerThumbnail height={250} width={220} rounded />
            <ShimmerThumbnail height={250} width={220} rounded />
            <ShimmerThumbnail height={250} width={220} rounded />
            <ShimmerThumbnail height={250} width={220} rounded />
          </>)}

          {/* This is for mobile on;y */}
          {isMobile && (
            <>
              <div className=' '>
                <ShimmerThumbnail height={30} width={350} rounded />
              </div>
              <ShimmerThumbnail height={150} width={110} rounded />
              <ShimmerThumbnail height={150} width={110} rounded />
              <ShimmerThumbnail height={150} width={110} rounded />
              <ShimmerThumbnail height={150} width={110} rounded />
              <ShimmerThumbnail height={150} width={110} rounded />
              <ShimmerThumbnail height={150} width={110} rounded />
            </>
          )}

        </div>
      ) : (
        <div className="m-5">
          {movieNames.map((movieName, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mb-3 text-yellow-400">{movieName}</h2>
              <RecommendMovies movies={movieResults[index]} />
            </div>
          ))}
        </div>
      )}

      <div className="flex  justify-center  md:gap-2 px-4 md:px-[30vw] w-full text-yellow-200 font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 my-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <span className="text-center text-[11px] md:text-sm">
          These are from IMDB Database. The search may not be accurate.
        </span>
      </div>
    </div>
  );
};

export default GptMovieSuggestion;

import React, { useEffect, useRef, useState } from "react";
import { NotificationManager } from "react-notifications";

const FloatingBox = ({ isOpen, onClose, trailerUrl, movieDetails }) => {

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  console.log("movieDetails : " , movieDetails)
  if(!movieDetails) {
    return null;
  }
  const handleClickOutside = (event) => {
    if (!event.target.closest(".floating-box-content")) {
      onClose();
    }
  };



  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-75 z-10"></div>

      {/* Floating box container */}
      <div className="relative z-20 bg-white rounded-lg w-screen h-screen md:w-[80vw] md:h-[80vh] overflow-hidden shadow-lg">
        {/* Close button */}
        <button
          className={`absolute top-2 right-2 mt-10 md:mt-0 text-6xl z-30 ${!trailerUrl ? "text-black" : "text-white"}`}
          onClick={onClose}
        >
          &times;
        </button>


        {/* Video iframe or error message */}
        {!trailerUrl ? (
          <div className=" w-full h-full flex  justify-center mt-28 text-black text-6xl">
            No preview available
          </div>
        ) : (
          <iframe
            className="absolute left-0 w-full h-full z-0"
            src={trailerUrl}
            title="Trailer"
            frameBorder="0"
            allow="loop accelerometer; autoplay; mute=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {/* Content container */}
        <div className="absolute bottom-0 left-0 w-full h-[35%] md:h-[45%] bg-gradient-to-t from-black via-gray-600 to-transparent p-4 md:p-6 z-30 overflow-y-auto hide-scrollbar floating-box-content">
          <div className="flex justify-between items-center mb-4 md:mb-8">
            {/* Rating */}
            <div className="flex items-center">
              <h2 className="text-xl md:text-4xl lg:text-6xl font-bold text-white">
                {movieDetails.title}
              </h2>
              <p className="text-sm md:text-xl lg:text-2xl font-bold ml-2 md:ml-4 text-yellow-500">
                {movieDetails.vote_average}⭐
              </p>
            </div>
          </div>
          <p className="text-sm md:text-lg lg:text-base mt-2 md:mt-4 text-white">
            {movieDetails.overview}
          </p>
          <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-4">
            {movieDetails.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-300 text-gray-800 p-1 md:p-2 rounded-md text-xs md:text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="mt-4 md:mt-6">
            <p className="font-bold text-white">Production Companies:</p>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {movieDetails.production_companies.map((company) => (
                <span
                  key={company.id}
                  className="bg-blue-500 text-white px-2 md:px-3 py-1 rounded-md text-xs md:text-sm hover:bg-blue-600 cursor-pointer"
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-6">
            <p className="font-bold text-white">Release Date:</p>
            <p className="text-white">{movieDetails.release_date}</p>
          </div>
          {movieDetails.tagline && (
            <div className="mt-4 md:mt-6">
              <p className="font-bold text-white">Tagline:</p>
              <p className="text-white">{movieDetails.tagline}</p>
            </div>
          )}
          <div className="mt-4 md:mt-6">
            <p className="font-bold text-white">Homepage:</p>
            <a
              href={movieDetails.homepage}
              className="text-blue-500 hover:underline"
            >
              {movieDetails.homepage}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingBox;

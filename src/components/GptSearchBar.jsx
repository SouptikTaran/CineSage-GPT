

import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import lang from "../utils/LanguageConstant";
import rateLimit from 'axios-rate-limit';
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult , toggleLoading} from "../utils/gptSlice";
import axios from 'axios';
import llamaAPI from "../utils/openAi";
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css';

// Create a rate-limited axios instance
const http = rateLimit(axios.create(), { maxRequests: 5, perMilliseconds: 1000 }); // Adjust the rate limit as needed

const GptSearchBar = () => {
  const langChange = useSelector(store => store.config?.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await http.get(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.data;

    return json.results;
  };

  const gptSearchText = async () => {
    if (searchText.current.value === '') {
      return NotificationManager.warning('Empty Field','Request Unsuccessful', 3000)
    }
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example format given ahead and give only name of movies nothing else. Example Format: Movie1, Movie2, Movie3, Movie4, Movie5.";


    try {
      NotificationManager.info('' , 'Request Processing' ,);
      const apiRequestJson = {
        messages: [{ role: "user", content: gptQuery }],
      }
      llamaAPI.run(apiRequestJson)
        .then(async (response) => {
          const message = response.choices[0].message.content;
          const gptMovies = message.split(",").map(movie => movie.trim());
          const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
          const tmdbResults  = await Promise.all(promiseArray);

          dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
          dispatch(toggleLoading())
          NotificationManager.success('', 'Request Successful' , 3000);
        }
        )
        .catch((error) => {
          console.error('Error in llamaAPI run:', error);
          NotificationManager.error('Error message', 'Request Unsuccessful', 3000)

        }
      )


    } catch (error) {
      console.error('Error in axios POST request:', error);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form className="w-[80vw] md:w-1/2   bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          className="p-2 m-2    rounded col-span-9 text-xs md:text-base"
          placeholder={lang[langChange].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 my-2 md:mx-1 bg-red-700 text-white rounded-lg"
          onClick={gptSearchText}
        >
          {lang[langChange].search}
        </button>
      </form>
      <NotificationContainer />
    </div>
  );


};

export default GptSearchBar;

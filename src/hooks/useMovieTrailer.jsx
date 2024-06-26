import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {addTrailer} from "../utils/movieSlice";

const useMovieTrailer = (movieID) => {
    const dispatch = useDispatch();

    const getMovieTrailer = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`;
        try {
            const data = await fetch(url, API_OPTIONS);
            const json = await data.json();
            const filterData = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterData.length ? filterData[0] : json.results[0];
            dispatch(addTrailer(trailer));
        } catch (error) {
            console.error("Error fetching movie trailer:", error);
            // Handle error gracefully (e.g., set error state, retry mechanism)
        }
    };

    useEffect(() => {
        getMovieTrailer();
    }, []); 

};

export default useMovieTrailer;

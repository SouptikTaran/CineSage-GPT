import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import {addUpcomingMovies} from "../utils/movieSlice"


const useUpcoming = async () => {
    const dispatch = useDispatch();
    const nowPlaying = useSelector(store => store.movies?.nowPlaying)
    const getNowPlayingMovies = async () =>{
      const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2",API_OPTIONS );
      const data = await response.json();
      dispatch(addUpcomingMovies(data.results))
    }
    useEffect(()=>{
      !nowPlaying && getNowPlayingMovies();
    },[])

}

export default useUpcoming
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import {addnowPlayingMovies} from "../utils/movieSlice"



const useNowPLayingMovies = async () => {
    const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)

    const getNowPlayingMovies = async () =>{
      const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",API_OPTIONS );
      const data = await response.json();
      dispatch(addnowPlayingMovies(data.results))
    }

    useEffect(()=>{
      !nowPlayingMovies &&getNowPlayingMovies();
    } , [])

}

export default useNowPLayingMovies
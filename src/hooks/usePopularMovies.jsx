import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import {addPopularMovies} from "../utils/movieSlice"


const usePopularMovies = async () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = async () =>{
      const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",API_OPTIONS );

      const data = await response.json();
      dispatch(addPopularMovies(data.results))
    }

    useEffect(()=>{
      getNowPlayingMovies();
    } ,[])

}

export default usePopularMovies
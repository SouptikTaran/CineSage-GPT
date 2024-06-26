import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import {addTopRatedMovies} from "../utils/movieSlice"


const useTopRated = async () => {
    const dispatch = useDispatch();
    const show = useSelector(store => store.movies.topRatedMovies)
    const getNowPlayingMovies = async () =>{
      const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",API_OPTIONS );
      const data = await response.json();
      dispatch(addTopRatedMovies(data.results))
    }

    useEffect(()=>{
     !show &&  getNowPlayingMovies();
    },[])

}

export default useTopRated
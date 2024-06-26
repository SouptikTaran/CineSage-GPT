import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import { addpopularShows } from '../utils/tvshowSlice';



const usePopularShow = async () => {
    const dispatch = useDispatch();

  const shows = useSelector(store => store.TVShows.popularShows)


    const getNowPlayingMovies = async () =>{
      const response = await fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",API_OPTIONS );
      const data = await response.json();
      dispatch(addpopularShows(data.results))
    }

    useEffect(()=>{
      !shows &&getNowPlayingMovies();
    } , [])

}

export default usePopularShow
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import { addairingToday } from '../utils/tvshowSlice';



const useNowPLayingMovies = async () => {
    const dispatch = useDispatch();

  const shows = useSelector(store => store.TVShows.onTheAir)


    const getNowPlayingMovies = async () =>{
      const response = await fetch("https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",API_OPTIONS );
   
      const data = await response.json();
      dispatch(addairingToday(data.results))
    }

    useEffect(()=>{
      getNowPlayingMovies();
    } , [])

}

export default useNowPLayingMovies
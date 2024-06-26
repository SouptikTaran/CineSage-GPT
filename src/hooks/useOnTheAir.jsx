import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import { addonTheAir } from '../utils/tvshowSlice';



const useOnTheAir = async () => {
    const dispatch = useDispatch();

  const shows = useSelector(store => store.TVShows.onTheAir)


    const getNowPlayingMovies = async () =>{
      const response = await fetch("https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",API_OPTIONS );

      const data = await response.json();
      dispatch(addonTheAir(data.results))
    }

    useEffect(()=>{
      !shows && getNowPlayingMovies();
    } , [])

}

export default useOnTheAir
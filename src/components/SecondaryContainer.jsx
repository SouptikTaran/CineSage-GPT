import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const   SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(store => store.movies?.nowPlayingMovies)
  const popularMovies = useSelector(store => store.movies?.popularMovies)
  const topRatedMovies = useSelector(store => store.movies?.topRatedMovies)
  const upcomingMovies = useSelector(store => store.movies?.upcomingMovies)

  const airingToday = useSelector(store => store.TVShows.airingToday)
  const onTheAir = useSelector(store => store.TVShows.onTheAir)
  const popularShow =  useSelector(store => store.TVShows.popularShows)
  const topRatedShows = useSelector(store => store.TVShows.topRated)


  if (!nowPlayingMovies || !popularMovies || !topRatedMovies || !upcomingMovies || !airingToday || !onTheAir || !popularShow || !topRatedShows) return null;
  return (
    <div className="bg-black" >
      <div className="md:-mt-48 pl-3 md:pl-10  relative z-20">
        <MovieList title={"Now Playing"} movies={nowPlayingMovies} link={"/movie/now_playing"} />
        <MovieList title={"Popular"} movies={popularMovies} link={"/movie/popular"} />
        <MovieList title={"Top Rated Movies"} movies={topRatedMovies} link={"/movie/top_rated"} />
        <MovieList title={"Upcoming Movies"} movies={upcomingMovies} link={"/movie/upcoming"} />
        <MovieList title={"Airing Today"} movies={airingToday} link={"/tv/airing_today"} />
        <MovieList title={"On The Air"} movies={onTheAir} link={"/tv/on_the_air"} />
        <MovieList title={"Popular Shows"} movies={popularShow} link={"/tv/popular"} />
        <MovieList title={"Top Rated Shows"} movies={topRatedShows} link={"/tv/top_rated"} />

      </div>
    </div>)
}

export default SecondaryContainer
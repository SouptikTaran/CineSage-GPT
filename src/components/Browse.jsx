import { useMemo } from "react";
import Header from "./Header";
import useNowPLayingMovies from "../hooks/useNowPLayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useTopRated";
import useUpcoming from "../hooks/useUpcoming";
import useAiringToday from "../hooks/useAiringToday";
import useOnTheAir from "../hooks/useOnTheAir";
import usePopularShow from "../hooks/usePopularShow";
import useTopRatedShow from "../hooks/useTopRatedShow";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gptSearch?.showGptSearch);
  
  // Custom hooks to fetch movie data
  useNowPLayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcoming();
  useAiringToday();
  useOnTheAir();
  usePopularShow();
  useTopRatedShow();

  const memoizedMainContainer = useMemo(() => <MainContainer />, []);
  const memoizedSecondaryContainer = useMemo(() => <SecondaryContainer />, []);

  return (
    <>
      <Header />

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          {memoizedMainContainer}
          {memoizedSecondaryContainer}
        </>
      )}
    </>
  );
};

export default Browse;

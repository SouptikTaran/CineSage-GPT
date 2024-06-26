import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieID }) => {
  const trailer = useSelector(store => store.movies?.trailerVideo);
  const isMuted = useSelector(store => store.sound?.isSoundOn);
  useMovieTrailer(movieID)

  if (!trailer) return <></>

  return (<div>
    <iframe className='w-screen aspect-video' src={`https://www.youtube.com/embed/${trailer?.key}?&autoplay=1&mute=${isMuted ? '1' : '0'}&controls=0&loop=1&playlist=${trailer?.key}`} title="YouTube video player" allow=" autoplay; encrypted-media; " referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  </div>
  );
};

export default VideoBackground;

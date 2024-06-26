import { IMG_CDN_URL } from "../utils/constants";

const   MovieCard = ({ posterPath, backdropPath, rating , title , onClick }) => {
    const imagePath = posterPath || backdropPath;
    if (!imagePath) return null;

    return (
        <div className="relative w-[30vw] md:w-48 flex cursor-pointer" onClick={onClick}>
            <img
                className="rounded-md "
                src={IMG_CDN_URL + imagePath}
                alt="Movie Card"
                draggable="false"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md flex flex-col items-center justify-center text-center p-2">
                <p className="text-white text-lg font-bold">{title}</p>
                <span className="text-white text-lg font-bold mt-2">{rating}⭐</span>
            </div>
        </div>
    );
};

export default MovieCard;

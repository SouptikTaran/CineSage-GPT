import { BG_LOGO } from "../utils/constants"

const SearchMovie = () => {
    return (
        <>
            <div className="h-full  ">
                <div className="absolute inset-0 -z-10">
                    <img className="object-cover w-full h-full" src={BG_LOGO} alt="" />
                </div>
            </div>
        </>
    )
}

export default SearchMovie
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
// import { setSearchPage } from "../utils/searchSlice";
import { LOGO, SUPPORTED_LANG } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configLang";
import { Link } from "react-router-dom";
import SearchBox from './SearchBox';

const Header = () => {
  const user = useSelector((store) => store.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SignOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  const isShow = useSelector((store) => store.gptSearch?.showGptSearch);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubcribe();
  }, []);

  const handleSearch = () => {
    setSearchBoxOpen(true);
  };

  const handleGPTSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div>
      <div className="w-screen absolute px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
        <img className=" w-12 md:w-25 lg:w-44" src={require('../assets/images/Logo.png')} alt="CineSageGPT Logo" />

        {user ? (
          <div className="flex items-center gap-2 md:gap-4">
            {isShow && (
              <select
                className="cursor-pointer bg-slate-950 text-white rounded text-xs md:text-base"
                onChange={handleLangChange}
              >
                {SUPPORTED_LANG.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button
              className="text-white bg-orange-500 bg-opacity-80 p-1 md:p-2 rounded text-xs md:text-base hover:bg-opacity-50"
              onClick={handleGPTSearch}
            >
              {isShow ? "HOME 🏠" : "GPT SEARCH 🚀"}
            </button>

            <svg
              onClick={handleSearch}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              role="img"
              data-icon="MagnifyingGlassStandard"
              aria-hidden="true"
              className="search-icon invert cursor-pointer"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
                fill="currentColor"
              ></path>
            </svg>

            <svg
              className="invert"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              role="img"
              data-icon="BellStandard"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
                fill="currentColor"
              ></path>
            </svg>

            <div
              className="relative flex items-center"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <img
                className="w-6 h-6 md:w-8 md:h-8 rounded"
                src="https://occ-0-8284-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e"
                alt="User"
              />
              <svg
                className="w-2 h-2 md:w-2.5 md:h-2.5 ml-1 md:ml-3 invert"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>

              <div
                id="dropdownHover"
                className={`${
                  dropdownOpen ? "block" : "hidden"
                } absolute mt-2 md:mt-[20vh] right-0 z-10 bg-white divide-x divide-gray-100 rounded-lg shadow w-32 md:w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-xs md:text-sm text-gray
                  700 dark:text-gray-200"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      GPT-SEARCH
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={SignOutUser}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {searchBoxOpen && (
        <SearchBox onClose={() => setSearchBoxOpen(false)} />
      )}
    </div>
  );
};

export default Header;

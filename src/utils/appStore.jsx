import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import movieReducer from "./movieSlice";
import soundReducer from "./soundSlice";
import gptReducer from "./gptSlice";
import configLangReducer from "./configLang";
import searchReducer from "./searchSlice";
import tvshowReducer from "./tvshowSlice";

const appStore = configureStore({
    reducer: {
        user : userReducer,
        movies : movieReducer,
        TVShows : tvshowReducer,
        sound : soundReducer,
        gptSearch : gptReducer,
        config : configLangReducer,
        search : searchReducer
    },
});

export default appStore;
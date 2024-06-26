import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gptSearch",
    initialState: {
        showGptSearch: null,
        movieResults: null,
        movieNames: null,
        showLoading : false ,
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
          },
          toggleLoading : (state)=>{
            state.showLoading = !state.showLoading
          }

    }
})


export const { toggleGptSearchView , addGptMovieResult , toggleLoading } = gptSlice.actions
export default gptSlice.reducer
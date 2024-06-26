import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies : null,
        topRatedMovies : null,
        upcomingMovies : null,
        trailerVideo : null,

    },

    reducers: {
        addnowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload ;
        },
        addTrailer : (state , action) =>{
            state.trailerVideo = action.payload ;
        },
        addPopularMovies :(state , action)=>{
            state.popularMovies = action.payload
        },
        addTopRatedMovies : (state ,action) =>{
            state.topRatedMovies = action.payload
        },
        addUpcomingMovies : (state , action) =>{
            state.upcomingMovies = action.payload
        },

    }
})


export const { addnowPlayingMovies , addTrailer , addPopularMovies , addTopRatedMovies , addUpcomingMovies }  = movieSlice.actions
export default movieSlice.reducer
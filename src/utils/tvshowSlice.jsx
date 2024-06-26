import { createSlice } from "@reduxjs/toolkit";

const tvshowSlice = createSlice({
    name: "TV Shows",
    initialState: {
        airingToday: null,
        onTheAir : null,
        popularShows : null,
        topRated : null,
    },

    reducers: {
        addairingToday: (state, action) => {
            state.airingToday = action.payload ;
        },
        addonTheAir : (state , action) =>{
            state.onTheAir = action.payload ;
        },
        addpopularShows :(state , action)=>{
            state.popularShows = action.payload
        },
        addtopRated : (state ,action) =>{
            state.topRated = action.payload
        },

    }
})


export const { addairingToday , addonTheAir , addpopularShows , addtopRated}  = tvshowSlice.actions

export default tvshowSlice.reducer
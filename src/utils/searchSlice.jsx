import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "Search",
    initialState: {
        searchPageShow : false , 
    },

    reducers: {
        setSearchPage: (state) => {
            state.searchPageShow = !state.searchPageShow ;
        },


    }
})


export const { setSearchPage}  = searchSlice.actions
export default searchSlice.reducer
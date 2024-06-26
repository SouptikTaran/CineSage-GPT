// soundSlice.js
import { createSlice } from "@reduxjs/toolkit";

const soundSlice = createSlice({
    name: "sound",
    initialState: {
        isSoundOn: true, 
    },
    reducers: {
        setIsMuted: (state , action) => {
            state.isSoundOn = !state.isSoundOn; 
        },
    },
});

export const { setIsMuted } = soundSlice.actions;
export default soundSlice.reducer;

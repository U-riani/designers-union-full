import { createSlice } from "@reduxjs/toolkit";


const initialState = () => {
    const savedLang = localStorage.getItem("lang") || 'ge';
    return savedLang
};

const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state = action.payload;
            localStorage.setItem("lang", action.payload)
        }
    }
});

export const {setlang} =  langSlice.actions;
export default langSlice.reducer;

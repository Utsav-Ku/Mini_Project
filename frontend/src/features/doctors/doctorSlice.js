import { createSlice } from "@reduxjs/toolkit";
const initlaState={
    doctors:[], // all doctor
    loading:false,// for showing loading
    error:null,// error message
    selectedDoctor:null, // when user Click View
}
const doctorSlice = createSlice({
    name:"doctor",
    initialState:initlaState,
    reducers:{
        fetchDoctorsStart:(state)=>{
            state.loading = true;
        },
        fetchDoctorsSuccess:(state,action)=>{
            state.loading = false;
            state.doctors = action.payload;
        },
        fetchDoctorsFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        selectDoctor:(state,action)=>{
            state.selectedDoctor = action.payload;
        },
    }
})
export const {fetchDoctorsStart,fetchDoctorsSuccess,fetchDoctorsFailure,selectDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;


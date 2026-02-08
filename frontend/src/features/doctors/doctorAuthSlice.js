import { createSlice } from "@reduxjs/toolkit";
const initialState={
    doctor:localStorage.getItem("doctor")?JSON.parse(localStorage.getItem("doctor")):null,
    loading:false,
    error:null
}   
const doctorAuthSlice = createSlice({
    name:"doctorAuth",
    initialState,
    reducers:{
        doctorLoginStart:(state)=>{
            state.loading=true
            state.error=null
        },
        doctorLoginSuccess:(state,action)=>{
            state.loading=false
            state.doctor=action.payload
        },
        doctorLoginFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        doctorLogout:(state)=>{
            state.doctor=null
            state.loading=false
            state.error=null
        }
    }
})
export const {doctorLoginStart,doctorLoginSuccess,doctorLoginFailure,doctorLogout} = doctorAuthSlice.actions
export default doctorAuthSlice.reducer
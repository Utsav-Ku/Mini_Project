import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    appointments:[],
    loading:false,
    error:null
}
const appointmentsSlice = createSlice({
    name:"appointments",
    initialState,
    reducers:{
        bookingStart:(state)=>{
            state.loading=true
        },
        bookingSuccess:(state,action)=>{
            state.loading=false
            state.appointments.push(action.payload)
        },
        bookingFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})
export const {bookingStart,bookingSuccess,bookingFailure} = appointmentsSlice.actions
export default appointmentsSlice.reducer


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
        // FETCH REDUCERS
        fetchStart:(state)=>{
            state.loading=true
            state.error=null
        },
        fetchSuccess:(state,action)=>{
            state.loading=false
            state.appointments=action.payload
        },
        fetchFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        // BOOKING REDUCERS
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
        },
        // UPDATE REDUCERS
        updateStart:(state)=>{
            state.loading=true
            state.error=null
        },
        updateSuccess:(state,action)=>{
            state.loading=false
            const index=state.appointments.findIndex((appt)=>appt.id===action.payload.id);
            if(index!==-1){
                state.appointments[index]=action.payload
            }
        },
        updateFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload
        }
    }
})
export const {bookingStart,bookingSuccess,bookingFailure,updateStart,updateSuccess,updateFailure,fetchStart,fetchSuccess,fetchFailure}=appointmentsSlice.actions
export default appointmentsSlice.reducer



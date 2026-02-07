import { createSlice } from "@reduxjs/toolkit";
const initialState={
    registrationForm:{
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        age:"",
        gender:""
    },
    loginForm:{
        email:"",
        password:""
    },
    loading:false,
    error:null,
    patient:null
}
const patientAuthSlice=createSlice({
    name:"patientAuth",
    initialState,
    reducers:{
        updateRegisterField:(state,action)=>{
            const {field,value}=action.payload;
            state.registrationForm[field]=value;
        },
        updateLoginField:(state,action)=>{
            const {field,value}=action.payload;
            state.loginForm[field]=value;
        },
        resetRegisterForm:(state)=>{
            state.registrationForm=initialState.registrationForm
        },
        resetLoginForm:(state)=>{
            state.loginForm=initialState.loginForm
        },
        authStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        authSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.patient=action.payload;
        },
        authFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        logout:(state)=>{
            state.patient=null;
            state.loading=false;
            state.error=null;
        }
    }
})
export const {updateRegisterField,updateLoginField,resetRegisterForm,resetLoginForm,authStart,authSuccess,authFailure,logout}=patientAuthSlice.actions;
export default patientAuthSlice.reducer;

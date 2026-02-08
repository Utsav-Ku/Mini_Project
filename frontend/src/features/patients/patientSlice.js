import { createSlice } from "@reduxjs/toolkit";
const storedPatient=localStorage.getItem("patient");
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
    patient:storedPatient?JSON.parse(storedPatient):null,
    patients:[]
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
        },
        fetchPatientsStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        fetchPatientsSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.patients=action.payload;
        },
        fetchPatientsFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updatePatientProfileStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updatePatientProfileSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.patient=action.payload;
        },
        updatePatientProfileFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})
export const {updateRegisterField,updateLoginField,resetRegisterForm,resetLoginForm,authStart,authSuccess,authFailure,logout,fetchPatientsStart,fetchPatientsSuccess,fetchPatientsFailure,updatePatientProfileStart,updatePatientProfileSuccess,updatePatientProfileFailure}=patientAuthSlice.actions;
export default patientAuthSlice.reducer;

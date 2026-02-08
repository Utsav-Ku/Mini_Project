import axios from "axios";
import { authStart, authSuccess, authFailure,resetRegisterForm,resetLoginForm,logout,fetchPatientsStart,fetchPatientsSuccess,fetchPatientsFailure} from "./patientSlice.js";
const BASE_URI="http://localhost:3000/patients"
export const registerPatient=()=>async(dispatch,getState)=>{
    try {
        dispatch(authStart())
        const {registrationForm}=getState().patientAuth // give me the patientAuth Slice from the redux store
        // getState() is a function that returns the current state of the redux store
        const {name,email,password,confirmPassword,age,gender}=registrationForm
        if(!name || !email || !password || !confirmPassword || !age || !gender){
            dispatch(authFailure("All fields are required"))
            return;
        }
        if(password!==confirmPassword){
            dispatch(authFailure("Passwords do not match"))
            return;
        }
        // check existing email;
        const checkEmail=await axios.get(`${BASE_URI}?email=${email}`)
        if(checkEmail.data.length>0){
            dispatch(authFailure("Email already exists"))
            return;
        }
        const res=await axios.post(BASE_URI,{name,email,password,age,gender})
        dispatch(authSuccess(res.data))
        dispatch(resetRegisterForm())

    } catch (error) {
        dispatch(authFailure(error.message))
    }
}
export const loginPatient=()=>async(dispatch,getState)=>{
    try {
        dispatch(authStart())
        const {loginForm}=getState().patientAuth
        const {email,password}=loginForm
        if(!email || !password){
            dispatch(authFailure("All fields are required"))
            return;
        }
        const res=await axios.get(`${BASE_URI}?email=${email}&password=${password}`);
        if(res.data.length===0){
            dispatch(authFailure("Invalid credentials"))
            return;
        }
        localStorage.setItem("patient",JSON.stringify(res.data[0]))
        // we store in localStorage to persist the data even after the page refresh because redux is temporary memory and localStorage isd permanent
        dispatch(authSuccess(res.data[0]))
        dispatch(resetLoginForm())
    } catch (error) {
        dispatch(authFailure(error.message))
    }
}
export const logoutPatient=()=> (dispatch)=>{
    localStorage.removeItem("patient")
    dispatch(logout())
}
export const fetchPatients=()=>async(dispatch)=>{
    try {
        dispatch(fetchPatientsStart())
        const res=await axios.get(BASE_URI)
        dispatch(fetchPatientsSuccess(res.data))
    } catch (error) {
        dispatch(fetchPatientsFailure(error.message))
    }
}




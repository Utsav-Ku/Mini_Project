import axios from "axios";
import { doctorLoginStart,doctorLoginSuccess,doctorLoginFailure,doctorLogout } from "./doctorAuthSlice.js";
export const doctorLogin = ({email,password}) => async (dispatch) => {
    dispatch(doctorLoginStart());
    try {
        const response = await axios.get("http://localhost:3000/doctors");
        console.log(response.data);
        const doctor = response.data.find((doctor)=>doctor.email===email&&doctor.password===password);
        console.log(doctor);
        if(doctor){
            localStorage.setItem("doctor",JSON.stringify(doctor));
            dispatch(doctorLoginSuccess(doctor));
        }else{
            dispatch(doctorLoginFailure("Invalid credentials"));
        }
    } catch (error) {
        dispatch(doctorLoginFailure(error.message));
    }
};
export const doctorlogout = () => (dispatch) => {
    localStorage.removeItem("doctor");
    dispatch(doctorLogout());
};
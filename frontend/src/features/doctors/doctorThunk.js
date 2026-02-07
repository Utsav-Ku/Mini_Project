import axios from "axios";
import { fetchDoctorsStart,fetchDoctorsSuccess,fetchDoctorsFailure} from "./doctorSlice.js";
export const fetchDoctors = () => async (dispatch) => {
    dispatch(fetchDoctorsStart());
    try {
        const response = await axios.get("http://localhost:3000/doctors");
        dispatch(fetchDoctorsSuccess(response.data));
    } catch (error) {
        dispatch(fetchDoctorsFailure(error.message));
    }
};
export const fetchDoctorById = (id) => async (dispatch) => {
    dispatch(fetchDoctorsStart());
    try {
        const response = await axios.get(`http://localhost:3000/doctors/${id}`);
        dispatch(fetchDoctorsSuccess(response.data));
    } catch (error) {
        dispatch(fetchDoctorsFailure(error.message));
    }
};
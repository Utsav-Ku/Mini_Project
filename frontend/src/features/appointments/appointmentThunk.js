import axios from "axios";
import {bookingStart,bookingSuccess,bookingFailure,fetchStart,fetchSuccess,fetchFailure,updateStart,updateSuccess,updateFailure} from "./appointmentsSlice.js";
const BASE_URL="http://localhost:3000/appointments"
export const bookAppointment = (appointmentData) => async (dispatch) => {
  try {
    dispatch(bookingStart());
    const res = await axios.post(BASE_URL,appointmentData);
    console.log(res.data)
    dispatch(bookingSuccess(res.data));
  } catch (err) {
    dispatch(bookingFailure(err.message));
  }
};
export const updateAppointmentStatus = (id,status) => async (dispatch) => {
  try {
    dispatch(updateStart());
    const res = await axios.patch(`${BASE_URL}/${id}`, {
      status: status,
    });
    dispatch(updateSuccess(res.data));
  } catch (err) {
    dispatch(updateFailure(err.message));
  }
};
export const fetchAppointments = () => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const res = await axios.get(BASE_URL);
    dispatch(fetchSuccess(res.data));
  } catch (err) {
    dispatch(fetchFailure(err.message));
  }
};


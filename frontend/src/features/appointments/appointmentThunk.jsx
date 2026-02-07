import axios from "axios";
import {bookingStart,bookingSuccess,bookingFailure} from "./appointmentsSlice.js";
export const bookAppointment = (appointmentData) => async (dispatch) => {
  try {
    dispatch(bookingStart());
    const res = await axios.post("http://localhost:3000/appointments",appointmentData);
    dispatch(bookingSuccess(res.data));
  } catch (err) {
    dispatch(bookingFailure(err.message));
  }
};

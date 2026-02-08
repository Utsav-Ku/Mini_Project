import { configureStore } from "@reduxjs/toolkit";
import patientAuthReducer from "../features/patients/patientSlice.js";
import doctorReducer from "../features/doctors/doctorSlice.js";
import doctorAuthReducer from "../features/doctors/doctorAuthSlice.js";
import appointmentsReducer from "../features/appointments/appointmentsSlice.js";
import adminReducer from "../features/admin/adminSlice.js"
export default configureStore({
    reducer:{
        patientAuth:patientAuthReducer,
        doctor:doctorReducer,
        doctorAuth:doctorAuthReducer,
        appointments:appointmentsReducer,
        admin: adminReducer
    }
})

import { configureStore } from "@reduxjs/toolkit";
import patientAuthReducer from "../features/patients/patientSlice.js";
import doctorReducer from "../features/doctors/doctorSlice.js";
import appointmentsReducer from "../features/appointments/appointmentsSlice.js";
<<<<<<< HEAD
import adminReducer from "../features/admin/adminSlice.js"
=======
import doctorAuthReducer from "../features/doctors/doctorAuthSlice.js";
>>>>>>> dc8ec16 (My local changes before pulling latest main)
export default configureStore({
    reducer:{
        patientAuth:patientAuthReducer,
        doctor:doctorReducer,
        appointments:appointmentsReducer,
<<<<<<< HEAD
        admin: adminReducer
=======
        doctorAuth:doctorAuthReducer,
        // adminAuth:adminAuthReducer
>>>>>>> dc8ec16 (My local changes before pulling latest main)
    }
})

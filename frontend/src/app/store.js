import { configureStore } from "@reduxjs/toolkit";
import patientAuthReducer from "../features/patients/patientSlice.js";
export default configureStore({
    reducer:{
        patientAuth:patientAuthReducer
    }
})

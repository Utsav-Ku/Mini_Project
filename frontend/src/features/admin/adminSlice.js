import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const admin_url = "http://localhost:3000/admins"
const doctor_url = "http://localhost:3000/doctors"
const appointment_url = "http://localhost:3000/appointments"

export const adminLogin = createAsyncThunk(
    "admin/login",
    async ({email, password}, {rejectWithValue}) => {
        try{
            const res = await axios.get(`${admin_url}?email=${email}&password=${password}`);
            if(res.data.length === 0){
                return rejectWithValue("Invalid Admin Credentials");
            }

            return res.data[0];
        }
        catch(err){
            return rejectWithValue("Login Failed");
        }
    }
)

//Doctors Crud
export const fetchAllDoctors = createAsyncThunk(
    "admin/fetchAllDoctors",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get(doctor_url);
            return res.data;
        } 
        catch(error) {
            return rejectWithValue("Error Fetching the doctors data");
        }
    }
)

export const addDoctor = createAsyncThunk(
    "admin/addDoctors",
    async (doctorData, {rejectWithValue}) => {
        try {
            const res = await axios.post(doctor_url, doctorData);
            return res.data;
        } 
        catch(error) {
            return rejectWithValue("Failed to add doctor")
        }
    }
)

export const updateDoctor = createAsyncThunk(
    "admin/updateDoctor",
    async ({id, updatedFields }, {rejectWithValue}) => {
        try{
            const res = await axios.put(`${doctor_url}/${id}`, {id, ...updatedFields});
            return res.data;
        }
        catch(err){
            return rejectWithValue("Failed to update doctor")
        }
    }
)

export const deleteDoctor = createAsyncThunk(
    "admin/deleteDoctor",
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(`${doctor_url}/${id}`)
            return id;
        } 
        catch(error) {
            return rejectWithValue("Failed to delete doctor");
        }
    }
)

//Appointments
export const fetchAllAppointments = createAsyncThunk(
    "admin/fetchAllAppointments",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get(appointment_url);
            return res.data;
        } 
        catch(error) {
            return rejectWithValue("Failed to fetch appointments");
        }
    }
)

const savedAdmin = JSON.parse(localStorage.getItem("admin"));

//Slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: savedAdmin || null,
        isAuthenticated: !!savedAdmin,
        doctors: [],
        appointments: [],
        loading: false,
        error: null
    },

    reducers: {
        adminLogout: (state) => {
            state.admin = null,
            state.isAuthenticated = false,
            state.doctors = [],
            state.appointments = []
            localStorage.removeItem("admin");
        }
    },
    extraReducers: (builder) => {
        builder
        //Login
        .addCase(adminLogin.pending, (state) => {
            state.loading = true,
            state.error = null;
        })
        .addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false,
            state.isAuthenticated = true,
            state.admin = action.payload
            state.error = null;

            localStorage.setItem("admin", JSON.stringify(action.payload));
        })
        .addCase(adminLogin.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload;
        })
        //fetch Doctor
        .addCase(fetchAllDoctors.fulfilled, (state, action) => {
            state.doctors = action.payload;
        })

        //Add doctor
        .addCase(addDoctor.fulfilled, (state, action) => {
            state.doctors.push(action.payload);
        })

        //Update doctor
        .addCase(updateDoctor.fulfilled, (state, action) => {
            const index = state.doctors.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
            state.doctors[index] = action.payload;
            }
        })

        //Delete doctor
        .addCase(deleteDoctor.fulfilled, (state, action) => {
            state.doctors = state.doctors.filter(d => d.id !== action.payload);
        })

        //Fetch Appointments
        .addCase(fetchAllAppointments.fulfilled, (state, action) => {
            state.appointments = action.payload;
        });
    }
})

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
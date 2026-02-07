
// import PatientRegister from "./pages/patientRegister.jsx"
// npx json-server --watch db.json --port 3000 -> cmnd to run json server
import { Routes, Route, Navigate } from "react-router-dom"
import PatientLogin from "./pages/patientLogin.jsx"
import PatientHomePage from "./pages/patientHomePage.jsx"
import DoctorDetails from "./pages/DoctorDetails.jsx"
import PatientRegister from "./pages/patientRegister.jsx"
import { useSelector } from "react-redux"
import DoctorLogin from "./pages/DoctorLogin.jsx"
import AdminLogin from "./pages/ AdminLogin.jsx"
// import DoctorHomePage from "./pages/DoctorHomePage.jsx"
// import AdminHomePage from "./pages/AdminHomePage.jsx"
function App() {
  const patient=useSelector((state)=>state.patientAuth.patient);
  // const doctor=useSelector((state)=>state.doctorAuth.doctor);
  // const admin=useSelector((state)=>state.adminAuth.admin);
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<PatientLogin />} />

      {/* Auth Routes */}
      <Route path="/register" element={<PatientRegister/>}/>
      <Route path="/doctor/login" element={<DoctorLogin/>}/>
      <Route path="/admin/login" element={<AdminLogin/>}/>

      {/* Patient Routes */}
      <Route path="/patient/home" element={patient ? <PatientHomePage /> : <Navigate to="/" />}/>
      <Route path="/doctor/:id" element={patient ? <DoctorDetails /> : <Navigate to="/" />}/>
    
      {/* Doctor Routes */}
      {/* <Route path="/doctor/home" element={doctor ? <DoctorHomePage /> : <Navigate to="/doctor/login" />}/> */}

      {/* Admin Routes */}
      {/* <Route path="/admin/home" element={admin ? <AdminHomePage /> : <Navigate to="/admin/login" />}/> */}

      {/* Fall back */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App

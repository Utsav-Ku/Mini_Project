
// import PatientRegister from "./pages/patientRegister.jsx"
import { Routes, Route, Navigate } from "react-router-dom"
import PatientLogin from "./pages/patientLogin.jsx"
import PatientHomePage from "./pages/patientHomePage.jsx"
import DoctorDetails from "./pages/DoctorDetails.jsx"
import PatientRegister from "./pages/patientRegister.jsx"
import { useSelector } from "react-redux"
function App() {
  const patient=useSelector((state)=>state.patientAuth.patient);
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/register"/>}/>
      {/* Public Routes */}
      <Route path="/register" element={<PatientRegister/>}/>
      <Route path="/login" element={<PatientLogin/>}/>
      {/* Protected Routes */}
      <Route path="/patient/home" element={patient ? <PatientHomePage /> : <Navigate to="/login" />}/>
      <Route path="/doctor/:id" element={patient ? <DoctorDetails /> : <Navigate to="/login" />}/>
      {/* Default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App

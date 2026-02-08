import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePatientProfile } from "../features/patients/patientThunk.js";
export default function PatientProfilePage() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  // Logged-in patient from redux
  const patient=useSelector((state)=>state.patientAuth.patient);
  const {loading,error}=useSelector((state)=>state.patientAuth);
  // Local form state
  const [formData,setFormData]=useState({ name: "",age: "",gender: "",});
  // Redirect if not logged in
  useEffect(() => {
    if (!patient) {
      navigate("/login");
    } else {
      setFormData({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
      });
    }
  }, [patient, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient={
      ...patient,
      ...formData,
    };
    dispatch(updatePatientProfile(updatedPatient));
    navigate("/patient/home");
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Patient Profile</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required/>
        {/* Email (Read Only) */}
        <input type="email" value={patient?.email} disabled className="w-full p-2 border rounded bg-gray-100"/>
        {/* Age */}
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" required/>
        {/* Gender */}
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {/* Submit */}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

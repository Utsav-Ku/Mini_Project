import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDoctors } from "../features/doctors/doctorThunk.js"
import DoctorComponent from "../components/DoctorComponent.jsx"
import { useNavigate } from "react-router-dom";
import { logoutPatient } from "../features/patients/patientThunk.js"

export default function PatientHomePage() {
    const dispatch = useDispatch();
    // Redux State
    const patient = useSelector((state) => state.patientAuth.patient);
    const { doctors, loading } = useSelector(
        (state) => state.doctor
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (!patient) {
            navigate("/login");
        }
    }, [patient]);

    // Local State
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedSpec, setSelectedSpec] = useState(null);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]); // load doctors when it needed

    // debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);  // concept of debouncing

    const specializations = [
        ...new Set(doctors.map((doc) => doc.specialization))
    ]; // unique specializations doctors available;

    // filtering logic
    const filteredDoctors = doctors.filter((doc) => {
        const matchName = doc.name.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchSpec = selectedSpec ? doc.specialization === selectedSpec : true;
        return matchName && matchSpec;
    });// filter doctors based on search and specialization
    // .fillter will return a new array

    const handleLogout = () => {
        dispatch(logoutPatient());
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">MediCare</h1>
                                <p className="text-xs text-gray-500">Find Your Doctor</p>
                            </div>
                        </div>

                        {/* Welcome Message and Actions */}
                        <div className="flex items-center space-x-4">
                            <div className="text-right mr-4 hidden md:block">
                                <p className="text-sm text-gray-500">Welcome back,</p>
                                <p className="font-bold text-gray-800">{patient?.name}</p>
                            </div>
                            <button onClick={() => navigate("/patient/profile")} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span className="font-semibold">Profile</span>
                            </button>
                            <button onClick={handleLogout} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                <span className="font-semibold">Logout</span>
                            </button>
                            <button onClick={() => navigate("/patient/dashboard")} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2a4 4 0 014-4h4m-6 8v-2a4 4 0 014-4h4m-6 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="font-semibold">Dashboard</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search for doctors by name..." 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            className="w-full pl-14 pr-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 shadow-lg transition-all duration-200 placeholder-gray-400"
                        />
                        {search && (
                            <button 
                                onClick={() => setSearch("")}
                                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar: Specialization Filter */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                                    </svg>
                                </div>
                                Specializations
                            </h2>
                            
                            <button 
                                onClick={() => setSelectedSpec(null)} 
                                className={`w-full mb-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                    selectedSpec === null 
                                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105" 
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                                }`}
                            >
                                All Specializations
                            </button>

                            <div className="space-y-2">
                                {specializations.map((spec) => (
                                    <button 
                                        key={spec} 
                                        onClick={() => setSelectedSpec(spec)} 
                                        className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 text-left ${
                                            selectedSpec === spec 
                                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105" 
                                                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{spec}</span>
                                            {selectedSpec === spec && (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Doctor List */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {selectedSpec ? `${selectedSpec} Specialists` : "All Doctors"}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                                        {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'}
                                    </span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="relative">
                                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100"></div>
                                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
                                    </div>
                                    <p className="text-gray-600 mt-6 font-medium">Loading doctors...</p>
                                </div>
                            ) : filteredDoctors.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 text-xl font-semibold mb-2">No doctors found</p>
                                    <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                                </div>
                            ) : (
                                <DoctorComponent doctors={filteredDoctors} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
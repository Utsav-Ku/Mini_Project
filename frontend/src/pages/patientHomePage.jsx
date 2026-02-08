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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MediCare</h1>
                                <p className="text-xs text-gray-500 font-medium">Find Your Doctor</p>
                            </div>
                        </div>

                        {/* Welcome Message and Actions */}
                        <div className="flex items-center space-x-3">
                            <div className="text-right mr-4 hidden md:block">
                                <p className="text-sm text-gray-500">Welcome back,</p>
                                <p className="font-bold text-gray-800">{patient?.name}</p>
                            </div>
                            <button onClick={() => navigate("/patient/dashboard")} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="font-semibold">Dashboard</span>
                            </button>
                            <button onClick={() => navigate("/patient/profile")} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span className="font-semibold">Profile</span>
                            </button>
                            <button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                <span className="font-semibold">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Stats Cards */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-white mb-3">Find Your Perfect Doctor</h2>
                        <p className="text-indigo-100 text-lg">Book appointments with top-rated healthcare professionals</p>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">{doctors.length}</p>
                                    <p className="text-indigo-100 text-sm font-medium">Available Doctors</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">{specializations.length}</p>
                                    <p className="text-indigo-100 text-sm font-medium">Specializations</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">24/7</p>
                                    <p className="text-indigo-100 text-sm font-medium">Support Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search for doctors by name..." 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            className="w-full pl-16 pr-6 py-5 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 shadow-xl transition-all duration-200 placeholder-gray-400"
                        />
                        {search && (
                            <button 
                                onClick={() => setSearch("")}
                                className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar: Specialization Filter */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mr-3">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                                    </svg>
                                </div>
                                Specializations
                            </h2>
                            
                            <button 
                                onClick={() => setSelectedSpec(null)} 
                                className={`w-full mb-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                                    selectedSpec === null 
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" 
                                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-indigo-200"
                                }`}
                            >
                                All Specializations
                            </button>

                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-gray-100">
                                {specializations.map((spec) => (
                                    <button 
                                        key={spec} 
                                        onClick={() => setSelectedSpec(spec)} 
                                        className={`w-full px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 text-left ${
                                            selectedSpec === spec 
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" 
                                                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-indigo-200"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="truncate">{spec}</span>
                                            {selectedSpec === spec && (
                                                <svg className="w-5 h-5 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-100">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {selectedSpec ? `${selectedSpec} Specialists` : "All Doctors"}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-full border-2 border-indigo-200">
                                        {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'}
                                    </span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-24">
                                    <div className="relative">
                                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-100"></div>
                                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-indigo-600 absolute top-0 left-0"></div>
                                    </div>
                                    <p className="text-gray-600 mt-8 font-semibold text-lg">Loading doctors...</p>
                                </div>
                            ) : filteredDoctors.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24">
                                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 text-2xl font-bold mb-3">No doctors found</p>
                                    <p className="text-gray-500 text-base">Try adjusting your search or filters</p>
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
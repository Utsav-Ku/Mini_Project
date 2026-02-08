import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { fetchDoctors } from "../features/doctors/doctorThunk.js"
import DoctorComponent from "../components/DoctorComponent.jsx"
import { useNavigate } from "react-router-dom";
import { logoutPatient } from "../features/patients/patientThunk.js"
export default function PatientHomePage(){
    const dispatch = useDispatch();
    // Redux State
    const patient = useSelector((state)=>state.patientAuth.patient);
    const {doctors,loading}=useSelector(
        (state) => state.doctor
    );
    const navigate = useNavigate();
    useEffect(() => {
        if(!patient){
            navigate("/login");
        }
    }, [patient]);
    
    // Local State
    const [search,setSearch]=useState("");
    const [debouncedSearch,setDebouncedSearch]=useState("");
    const [selectedSpec,setSelectedSpec]=useState(null);
    useEffect(()=>{
        dispatch(fetchDoctors());
    },[dispatch]); // load doctors when it needed
    // debounced search
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedSearch(search);
        },500);
        return ()=>clearTimeout(timer);
    },[search]);  // concept of debouncing
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
        <div className="p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Welcome, {patient?.name}</h1>
                <div className="flex gap-3">
                    <button onClick={() => navigate("/patient/profile")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Update Profile</button>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Logout</button>
                </div>
            </div>
            {/* Search Bar */}
            <input type="text" placeholder="Search doctor by name" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full mb-4 p-2 border rounded"/>
            <div className="grid grid-cols-4 gap-6">
            {/* Left: specialization filter */}
            <div className="col-span-1 border p-4 rounded">
                <h2 className="font-semibold mb-3">Specializations</h2>
                <button onClick={() => setSelectedSpec(null)} className={`block w-full mb-2 p-2 border rounded ${selectedSpec === null ? "bg-blue-600 text-white" : ""}`}>
                    All
                </button>
                {specializations.map((spec) => (
                    <button key={spec} onClick={() => setSelectedSpec(spec)} className={`block w-full mb-2 p-2 border rounded ${selectedSpec === spec ? "bg-blue-600 text-white" : ""}`}>
                        {spec}
                    </button>
                ))}
            </div>
            {/* Right: doctor list */}
            <div className="col-span-3">
                {loading ? (<p>Loading doctors...</p>) : (<DoctorComponent doctors={filteredDoctors} />)}
            </div>
        </div>
    </div>
    );
}


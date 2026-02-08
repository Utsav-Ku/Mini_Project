import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../features/admin/adminSlice";

export default function AdminHomePage(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout(){
        dispatch(adminLogout());
        alert("Logged Out Successfully!!");
        navigate("/admin/login");
    }
    
    const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition 
    ${isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"}`;

    return(
        <div class="flex min-h-screen bg-slate-100">
            {/* sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-8 text-center">Hospital Admin</h2>
                <nav>
                    <NavLink to="/admin/dashboard" className={linkClass}>
                        📊 Analytics
                    </NavLink>
                    <NavLink to="/admin/doctors" className={linkClass}>
                        👨‍⚕️ Manage Doctors
                    </NavLink>
                    <NavLink to="/admin/add-doctor" className={linkClass}>
                        ➕ Add Doctor
                    </NavLink>
                    <NavLink to="/admin/appointments" className={linkClass}>
                        📅 Appointments
                    </NavLink>
                </nav>

                <button onClick={handleLogout} className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                    Logout
                </button>
            </aside>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
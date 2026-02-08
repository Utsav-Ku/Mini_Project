import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllAppointments } from '../../features/admin/adminSlice'


const AdminDashboard = () => {

    const dispatch = useDispatch();
    const { appointments, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAllAppointments());
    }, [dispatch]);

    const total = appointments.length;

    const confirmed = appointments.filter((appointment) => appointment.status === "confirmed").length;
    const pending = appointments.filter((appointment) => appointment.status === "pending").length;
    const cancelled = appointments.filter((appointment) => appointment.status === "cancelled").length;

    const last7Days = appointments.filter(a => {
        const diff = (new Date() - new Date(a.date)) / (1000 * 60 * 60 * 24);
        return diff <= 7; 
    }).length;

    const last30Days = appointments.filter(a => {
        const diff = (new Date() - new Date(a.date)) / (1000 * 60 * 60 * 24);
        return diff <= 30; 
    }).length;

    return (
        <div>
            <h1 className='text-2xl font-bold mb-6'>📊 Admin Analytics Dashboard</h1>
            {loading && <p>Loading Analytics...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Appointments" value={total} color="bg-blue-500" />
                <StatCard title="Confirmed" value={confirmed} color="bg-green-500" />
                <StatCard title="Cancelled" value={cancelled} color="bg-red-500" />
                <StatCard title="Pending" value={pending} color="bg-yellow-500" />
                <StatCard title="Last 7 Days" value={last7Days} color="bg-purple-500" />
                <StatCard title="Last 30 Days" value={last30Days} color="bg-orange-500"/>
            </div>
        </div>
    )
}

const StatCard = ({ title, value, color }) => {
    return(
        <div className={`p-6 rounded-xl shadow text-white ${color}`}>
            <h3 className="text-sm opacity-90">{title}</h3>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    )
}

export default AdminDashboard

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments, fetchAllDoctors } from "../../features/admin/adminSlice";

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, doctors, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllAppointments());
    dispatch(fetchAllDoctors()); // to map doctorId -> name (optional but nice)
  }, [dispatch]);

  // Show only upcoming appointments(today or future)
  const today = new Date().toISOString().split("T")[0];

  const upcomingAppointments = appointments.filter(a => a.date >= today);

  const getDoctorName = (doctorId) => {
    const doc = doctors.find(d => String(d.id) === String(doctorId));
    return doc ? doc.name : doctorId;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📅 Upcoming Appointments</h1>

      {loading && <p>Loading appointments...</p>}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Appointment ID</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Patient ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Slot</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.id}</td>
                <td className="p-3">{getDoctorName(a.doctorId)}</td>
                <td className="p-3">{a.patientId}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.slot}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs capitalize
                      ${
                        a.status === "confirmed"
                          ? "bg-green-500"
                          : a.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}

            {upcomingAppointments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-slate-500">
                  No upcoming appointments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;

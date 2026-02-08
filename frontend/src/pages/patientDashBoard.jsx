import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchAppointments } from "../features/appointments/appointmentThunk.js";
import { fetchDoctors } from "../features/doctors/doctorThunk.js";
import StatusBadge from "../components/statusBadge.jsx";
export default function PatientDashBoard(){
    const dispatch=useDispatch();
    const{appointments,loading:apptLoading}=useSelector((state)=>state.appointments);
    const{doctors,loading:doctorLoading}=useSelector((state)=>state.doctor);
    const patient=useSelector((state)=>state.patientAuth.patient);
    useEffect(()=>{
        dispatch(fetchAppointments());
        if(doctors.length===0){
            dispatch(fetchDoctors());
        }
    },[dispatch,doctors.length]);
    const myAppointments=appointments.filter((appt)=>appt.patientId===patient.id);
    const getDoctorName=(doctorId)=>{
        const doctor=doctors.find((doc)=>doc.id===doctorId);
        return doctor?doctor.name:"Unknown Doctor";
    };
    if(apptLoading||doctorLoading){
        return (
            <div className="text-center mt-10 text-gray-500">Loading appointments...</div>
        )
    }
    return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        My Appointments
      </h1>

      {myAppointments.length === 0 ? (
        <p className="text-gray-500">
          You have no appointments yet.
        </p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Doctor</th>
              <th className="p-2 border">Slot</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {myAppointments.map((appt) => (
              <tr key={appt.id}>
                <td className="p-2 border">
                  {getDoctorName(appt.doctorId)}
                </td>

                <td className="p-2 border">
                  {appt.slot}
                </td>

                <td className="p-2 border">
                  {appt.date}
                </td>

                <td className="p-2 border">
                  <StatusBadge status={appt.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

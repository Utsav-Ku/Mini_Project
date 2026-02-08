import { useDispatch,useSelector } from "react-redux";
import { updateAppointmentStatus } from "../features/appointments/appointmentThunk.js";
export default function PatientComponent({appointment}) {
    const dispatch=useDispatch();
    const patients=useSelector((state)=>state.patientAuth.patients) || [];
    const patient=patients.find((patient)=>patient.id===appointment.patientId);
    console.log("patient is ",patient)
    if(!patient){
        return <p>Patient not found</p>
    }
    const handleAccept = () => {
        dispatch(updateAppointmentStatus(appointment.id, "accepted"));
    };
    const handleReject = () => {
        dispatch(updateAppointmentStatus(appointment.id, "rejected"));
    };
    // if(!patient) return null;
    return (
    <div className="border p-4 rounded shadow flex justify-between items-center">
      <div>
        <p className="font-semibold">{patient.name}</p>
        <p>{patient.email}</p>
        <p>Slot: {appointment.slot}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
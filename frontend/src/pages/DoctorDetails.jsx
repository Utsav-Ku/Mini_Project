import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../features/appointments/appointmentThunk";
import { useState } from "react";
export default function DoctorDetails() {
  const {id}=useParams();
  const dispatch=useDispatch();
  const doctors=useSelector((state)=>state.doctor.doctors);
  console.log("doctors",doctors);
  const appointments=useSelector((state)=>state.appointments.appointments);
  const patient=useSelector((state)=>state.patientAuth.patient);
  const doctor=doctors.find((doc)=>doc.id===id);
  const [selectedSlot,setSelectedSlot]=useState(null);
  if(!doctor){
    return <p>Doctor not found</p>;
  }
  const generateSlots=()=>{
    const slots=[]
    const [startH,startM]=doctor.workStart.split(":").map(Number);
    const [endH,endM]=doctor.workEnd.split(":").map(Number);
    let startTime=startH*60+startM;
    const endTime=endH*60+endM;
    while(startTime+doctor.slotDuration<=endTime){
      const fromH=String(Math.floor(startTime/60)).padStart(2,"0");
      const fromM=String(startTime%60).padStart(2,"0");
      const toTime=startTime+doctor.slotDuration;
      const toH=String(Math.floor(toTime/60)).padStart(2,"0");
      const toM=String(toTime%60).padStart(2,"0");
      slots.push(`${fromH}:${fromM} - ${toH}:${toM}`);
      startTime+=doctor.slotDuration;
    }
    return slots;
  };// ADVANCE LOGIC:
  const slots=generateSlots();
  const isSlotBooked=(slot)=>{
    return appointments.some(
      (appt)=>
        appt.doctorId===doctor.id&&
        appt.slot===slot&&
        appt.status!=="cancelled"
    );
  };
  const handleBookAppointment=()=>{
    if(!selectedSlot){
      alert("Please select a slot");
      return;
    }
    const appointmentData={
      doctorId:doctor.id,
      patientId:patient.id,
      slot:selectedSlot,
      status:"pending",
      date:new Date().toISOString().split("T")[0],
    };
    dispatch(bookAppointment(appointmentData));
    alert("Appointment request sent (Pending)");
    setSelectedSlot(null);
  };
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-40 h-40 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{doctor.name}</h1>
      <p className="text-gray-600">{doctor.specialization}</p>
      <p>{doctor.experience} years experience</p>
      <div className="mt-6">
        <h2 className="font-semibold mb-3">Available Slots</h2>
        <div className="grid grid-cols-4 gap-3">
          {slots.map((slot) => {
            const booked = isSlotBooked(slot);
            return (
              <button
                key={slot}
                disabled={booked}
                onClick={() => setSelectedSlot(slot)}
                className={`p-2 rounded border text-sm
                  ${
                    booked
                      ? "bg-gray-300 cursor-not-allowed"
                      : selectedSlot === slot
                      ? "bg-green-600 text-white"
                      : "hover:bg-green-100"
                  }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleBookAppointment}
          disabled={!selectedSlot}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}


import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../features/appointments/appointmentThunk.js";
import { useState,useEffect } from "react";
import { fetchAppointments } from "../features/appointments/appointmentThunk.js";
import { fetchDoctors } from "../features/doctors/doctorThunk.js";

export default function DoctorDetails() {
  const {id}=useParams();
  const dispatch=useDispatch();
  const doctors=useSelector((state)=>state.doctor.doctors);
  console.log("doctors",doctors);
  const appointments=useSelector((state)=>state.appointments.appointments);
  const patient=useSelector((state)=>state.patientAuth.patient);
  const [selectedSlot,setSelectedSlot]=useState(null);
  
  useEffect(()=>{
    if(doctors.length===0){
      dispatch(fetchDoctors());
    }
    dispatch(fetchAppointments());
  },[dispatch,doctors.length]);
  
  const doctor=doctors.find((doc)=>doc.id===id);
  
  if(!doctor){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading doctor details...</p>
        </div>
      </div>
    );
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
        appt.status==="accepted"
    );
  };
  
  console.log("appointments",appointments);
  
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Doctor Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h1 className="text-3xl font-bold text-white">Doctor Profile</h1>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Doctor Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="relative w-48 h-48 object-cover rounded-2xl shadow-2xl border-4 border-white ring-4 ring-indigo-100"
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">{doctor.name}</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Specialization</p>
                      <p className="text-lg font-semibold text-gray-800">{doctor.specialization}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Experience</p>
                      <p className="text-lg font-semibold text-gray-800">{doctor.experience} Years</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Working Hours</p>
                      <p className="text-lg font-semibold text-gray-800">{doctor.workStart} - {doctor.workEnd}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Booking Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mt-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Available Time Slots
            </h2>
            <p className="text-green-100 mt-1">Select a convenient time for your appointment</p>
          </div>

          <div className="p-8">
            {slots.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg font-semibold">No slots available</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {slots.map((slot) => {
                    const booked = isSlotBooked(slot);
                    return (
                      <button
                        key={slot}
                        disabled={booked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                          booked
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                            : selectedSlot === slot
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 text-white shadow-lg transform scale-105"
                            : "bg-white border-gray-300 text-gray-700 hover:border-green-500 hover:bg-green-50 hover:shadow-md"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <svg className={`w-5 h-5 ${booked ? 'text-gray-400' : selectedSlot === slot ? 'text-white' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{slot}</span>
                          {booked && (
                            <span className="text-xs text-gray-500 mt-1">Booked</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Slot Display */}
                {selectedSlot && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-green-700 font-medium">Selected Time Slot</p>
                        <p className="text-lg font-bold text-green-800">{selectedSlot}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Appointment Button */}
                <button
                  onClick={handleBookAppointment}
                  disabled={!selectedSlot}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center gap-3"
                >
                  {selectedSlot ? (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Book Appointment for {selectedSlot}
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Select a Time Slot to Continue
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-2xl shadow-md mt-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-semibold">Booking Information</p>
              <p className="text-xs text-blue-700 mt-1">Your appointment request will be sent to the doctor for approval. You will be notified once it's confirmed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
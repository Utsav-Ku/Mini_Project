import { useNavigate } from "react-router-dom";

export default function DoctorComponent({ doctors }) { 
  const navigate = useNavigate(); 
 
  return ( 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
      {doctors.map((doc) => ( 
        <div 
          key={doc.id} 
          className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
        > 
          {/* Image Container with Fixed Size */}
          <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden relative"> 
            <img 
              src={doc.image} 
              alt={doc.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            /> 
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div> 
 
          {/* Content Section */}
          <div className="p-6">
            <h3 className="font-bold text-2xl text-gray-800 mb-2">{doc.name}</h3> 
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <p className="text-gray-600 font-medium">{doc.specialization}</p> 
            </div>
 
            <button 
              onClick={() => navigate(`/doctor/${doc.id}`)} 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
            > 
              <span>View Profile</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button> 
          </div>
        </div> 
      ))} 
    </div> 
  ); 
}
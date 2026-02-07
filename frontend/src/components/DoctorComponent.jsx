import { useNavigate } from "react-router-dom";
export default function DoctorComponent({ doctors }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-4">
      {doctors.map((doc) => (
        <div
          key={doc.id}
          className="border p-4 rounded shadow"
        >
          <img
            src={doc.image}
            alt={doc.name}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h3 className="font-bold text-lg">{doc.name}</h3>
          <p className="text-gray-600">{doc.specialization}</p>
          <button onClick={() => navigate(`/doctor/${doc.id}`)} className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
            View
          </button>
        </div>
      ))}
    </div>
  );
}


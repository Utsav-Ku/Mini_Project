import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDoctors, deleteDoctor, updateDoctor } from "../../features/admin/adminSlice";

const AdminDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      dispatch(deleteDoctor(id));
    }
  }

  function handleEdit(doctor) {
    setEditDoctor(doctor);
    setShowModal(true);
  }

  function handleChange(e) {
    setEditDoctor({ ...editDoctor, [e.target.name]: e.target.value });
  }

  function handleUpdate(e) {
    e.preventDefault();

    dispatch(updateDoctor({ id: editDoctor.id, updatedFields: editDoctor }))
    .then(() => {
      dispatch(fetchAllDoctors());
      setShowModal(false);
      alert("Doctor updated successfully ✅");
    });
  }




  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">👨‍⚕️ Manage Doctors</h1>

      {loading && <p>Loading doctors...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={doc.image}
              alt={doc.name}
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <h3 className="text-lg font-semibold text-center mt-3">{doc.name}</h3>
            <p className="text-center text-slate-600">{doc.specialization}</p>
            <p className="text-center text-sm text-slate-500">
              {doc.experience} years experience
            </p>
            <p className="text-center text-sm text-slate-500">
              🕘 {doc.workStart} - {doc.workEnd}
            </p>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => handleEdit(doc)}
                className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && editDoctor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">✏️ Edit Doctor</h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="name"
                value={editDoctor.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Name"
              />
              <input
                type="text"
                name="specialization"
                value={editDoctor.specialization}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Specialization"
              />
              <input
                type="number"
                name="experience"
                value={editDoctor.experience}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Experience"
              />
              <div className="flex gap-2">
                <input
                  type="time"
                  name="workStart"
                  value={editDoctor.workStart}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="time"
                  name="workEnd"
                  value={editDoctor.workEnd}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;

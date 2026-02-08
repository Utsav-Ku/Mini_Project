import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDoctor } from "../../features/admin/adminSlice";

const AddDoctor = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    image: "",
    workStart: "",
    workEnd: "",
    slotDuration: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.specialization ||
      !formData.experience ||
      !formData.workStart ||
      !formData.workEnd ||
      !formData.slotDuration ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all required fields");
      return;
    }

    dispatch(addDoctor(formData));
    alert("Doctor added successfully ✅");

    // Reset form
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      image: "",
      workStart: "",
      workEnd: "",
      slotDuration: "",
      email: "",
      password: ""
    });
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">➕ Add New Doctor</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="time"
          name="workStart"
          value={formData.workStart}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="time"
          name="workEnd"
          value={formData.workEnd}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="slotDuration"
          placeholder="Slot Duration (minutes)"
          value={formData.slotDuration}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Doctor Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;

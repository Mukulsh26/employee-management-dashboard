import React, { useState } from "react";
import axios from "axios";

const AddEmployeeForm = ({ fetchEmployees }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/employees`, formData);
      fetchEmployees(); 
      setFormData({ name: "", position: "", department: "", email: "", phone: "" }); 
      setSuccessMessage("Employee added successfully!"); 

      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-employee-form">
      {successMessage && <p className="success-message">{successMessage}</p>} 
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
      <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;

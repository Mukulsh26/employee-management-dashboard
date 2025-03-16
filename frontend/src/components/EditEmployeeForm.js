import React, { useState } from "react";
import axios from "axios";

const EditEmployeeForm = ({ employee, fetchEmployees, close }) => {
  const [formData, setFormData] = useState({ ...employee });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_API_URL}/employees/${employee.id}`, formData);
    fetchEmployees(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Employee</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="position" value={formData.position} onChange={handleChange} required />
      <input type="text" name="department" value={formData.department} onChange={handleChange} required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      <button type="submit">Update</button>
      <button type="button" onClick={close}>Cancel</button>
    </form>
  );
};

export default EditEmployeeForm;

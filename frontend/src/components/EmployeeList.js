import React, { useState } from "react";
import axios from "axios";
import EmployeeDetails from "./EmployeeDetails";
import EditEmployeeForm from "./EditEmployeeForm";

const EmployeeList = ({ employees, fetchEmployees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const deleteEmployee = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employees</h2>
      {employees.map((emp) => (
        <div key={emp.id}>
          <p>
            <strong>{emp.name}</strong> - {emp.position}
          </p>
          <button onClick={() => setSelectedEmployee(emp)}>More Details</button>
          <button onClick={() => setEditingEmployee(emp)}>Edit</button>
          <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
        </div>
      ))}
      {selectedEmployee && (
        <EmployeeDetails employee={selectedEmployee} close={() => setSelectedEmployee(null)} />
      )}
      {editingEmployee && (
        <EditEmployeeForm employee={editingEmployee} fetchEmployees={fetchEmployees} close={() => setEditingEmployee(null)} />
      )}
    </div>
  );
};

export default EmployeeList;

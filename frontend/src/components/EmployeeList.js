import React, { useState } from "react";
import axios from "axios";
import EmployeeDetails from "./EmployeeDetails";
import EditEmployeeForm from "./EditEmployeeForm";

const EmployeeList = ({ employees, fetchEmployees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const deleteEmployee = async () => {
    if (selectedEmployee) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/employees/${selectedEmployee.id}`);
      fetchEmployees();
      setSelectedEmployee(null); 
    }
  };

  
  const handleUpdateSuccess = () => {
    fetchEmployees();
    setIsEditing(false);
    setSelectedEmployee(null); 
  };

  return (
    <div className="employee-list">
      {employees.length > 0 && <h2>Employees</h2>}

      {employees.map((emp) => (
        <div key={emp.id} className="employee-card">
          <p>
            <strong>{emp.name}</strong> - {emp.position}
          </p>
          <button className="details-btn" onClick={() => setSelectedEmployee(emp)}>
            More Details
          </button>
        </div>
      ))}


      {selectedEmployee && (
        <div className="modal">
          {!isEditing ? (
            <>
              <EmployeeDetails employee={selectedEmployee} close={() => setSelectedEmployee(null)} />
              <div className="modal-buttons">
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={deleteEmployee} disabled={isEditing}>
                  Delete
                </button>
                <button className="close-btn" onClick={() => setSelectedEmployee(null)}>
                  Close
                </button>
              </div>
            </>
          ) : (
            <EditEmployeeForm
              employee={selectedEmployee}
              fetchEmployees={handleUpdateSuccess} 
              close={() => setIsEditing(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

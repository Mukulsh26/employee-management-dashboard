import React from "react";

const EmployeeDetails = ({ employee, close }) => {
  return (
    <div className="modal">
      <h2>{employee.name}</h2>
      <p>Position: {employee.position}</p>
      <p>Department: {employee.department}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <button onClick={close}>Close</button>
    </div>
  );
};

export default EmployeeDetails;

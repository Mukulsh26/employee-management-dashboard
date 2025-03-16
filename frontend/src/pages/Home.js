import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeList from "../components/EmployeeList";
import AddEmployeeForm from "../components/AddEmployeeForm";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
    setEmployees(res.data);
  };

  return (
    <div>
      <h1 className="dashboard-heading">Employee Management Dashboard</h1>

      {employees.length > 0 && (
        <button className="add-employee-btn" onClick={() => setIsModalOpen(true)}>
          + Add Employee
        </button>
      )}

      
      {employees.length === 0 && <AddEmployeeForm fetchEmployees={fetchEmployees} />}

      
      <EmployeeList employees={employees} fetchEmployees={fetchEmployees} />

      
      {isModalOpen && (
        <div className="modal">
          <AddEmployeeForm
            fetchEmployees={() => {
              fetchEmployees();
              setIsModalOpen(false); 
            }}
          />
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

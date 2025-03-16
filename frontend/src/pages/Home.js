import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeList from "../components/EmployeeList";
import AddEmployeeForm from "../components/AddEmployeeForm";

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/employees`);
    setEmployees(res.data);
  };

  return (
    <div>
      <AddEmployeeForm fetchEmployees={fetchEmployees} />
      <EmployeeList employees={employees} fetchEmployees={fetchEmployees} />
    </div>
  );
};

export default Home;

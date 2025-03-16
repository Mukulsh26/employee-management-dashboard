const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const employeesFile = "./data/employees.json";

// Read employees
const getEmployees = () => {
  try {
    return JSON.parse(fs.readFileSync(employeesFile));
  } catch (err) {
    return [];
  }
};

// API Routes
app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

app.get("/employees/:id", (req, res) => {
  const employees = getEmployees();
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  employee ? res.json(employee) : res.status(404).json({ error: "Not Found" });
});

app.post("/employees", (req, res) => {
  const employees = getEmployees();
  const newEmployee = { id: Date.now(), ...req.body };
  employees.push(newEmployee);
  fs.writeFileSync(employeesFile, JSON.stringify(employees));
  res.json(newEmployee);
});

app.put("/employees/:id", (req, res) => {
  let employees = getEmployees();
  employees = employees.map(emp => (emp.id === parseInt(req.params.id) ? { ...emp, ...req.body } : emp));
  fs.writeFileSync(employeesFile, JSON.stringify(employees));
  res.json({ message: "Employee updated" });
});

app.delete("/employees/:id", (req, res) => {
  let employees = getEmployees();
  employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
  fs.writeFileSync(employeesFile, JSON.stringify(employees));
  res.json({ message: "Employee deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

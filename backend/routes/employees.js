const express = require("express");
const fs = require("fs");

const router = express.Router();
const employeesFile = "./data/employees.json";

const getEmployees = () => {
  try {
    return JSON.parse(fs.readFileSync(employeesFile));
  } catch (err) {
    return [];
  }
};

router.get("/", (req, res) => {
  res.json(getEmployees());
});

router.get("/:id", (req, res) => {
  const employees = getEmployees();
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  employee ? res.json(employee) : res.status(404).json({ error: "Not Found" });
});

router.post("/", (req, res) => {
  const employees = getEmployees();
  const newEmployee = { id: Date.now(), ...req.body };
  employees.push(newEmployee);
  fs.writeFileSync(employeesFile, JSON.stringify(employees));
  res.json(newEmployee);
});

router.put("/:id", (req, res) => {
  let employees = getEmployees();
  employees = employees.map(emp => (emp.id === parseInt(req.params.id) ? { ...emp, ...req.body } : emp));
  fs.writeFileSync(employeesFile, JSON.stringify(employees));
  res.json({ message: "Employee updated" });
});

router.delete("/:id", (req, res) => {
  let employees = getEmployees();
  employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
  fs.writeFileSync(employeesFile, JSON.stringify(employees));
  res.json({ message: "Employee deleted" });
});

module.exports = router;
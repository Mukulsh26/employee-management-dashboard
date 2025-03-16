const express = require("express");
const fs = require("fs");

const router = express.Router();
const employeesFile = "/tmp/employees.json"; 


if (!fs.existsSync(employeesFile)) {
  fs.writeFileSync(employeesFile, JSON.stringify([]), "utf8");
}


const getEmployees = () => {
  try {
    return JSON.parse(fs.readFileSync(employeesFile, "utf8"));
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
  try {
    const employees = getEmployees();
    const newEmployee = { id: Date.now(), ...req.body };
    employees.push(newEmployee);
    fs.writeFileSync(employeesFile, JSON.stringify(employees, null, 2), "utf8");
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/:id", (req, res) => {
  try {
    let employees = getEmployees();
    employees = employees.map(emp => (emp.id === parseInt(req.params.id) ? { ...emp, ...req.body } : emp));
    fs.writeFileSync(employeesFile, JSON.stringify(employees, null, 2), "utf8");
    res.json({ message: "Employee updated" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete("/:id", (req, res) => {
  try {
    let employees = getEmployees();
    employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
    fs.writeFileSync(employeesFile, JSON.stringify(employees, null, 2), "utf8");
    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

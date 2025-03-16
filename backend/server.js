const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employees");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use employee routes
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
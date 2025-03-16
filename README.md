Overview
The Employee Management Dashboard is a full-stack web application that allows users to manage employees, including adding, updating, and deleting employee records. The application provides a dark mode UI with a clean and responsive design.

# Live-URL
https://employee-management-dashboard-eatp.vercel.app/

Features
✅ Add Employees – Add new employees using a form or modal.
✅ Edit Employees – Update existing employee details.
✅ Delete Employees – Remove employees from the list.
✅ Responsive Design – Works seamlessly on both desktop and mobile screens.
✅ Dark Mode UI – A modern, eye-friendly design.
✅ Modal Forms – Add and edit employees in a modal window for better UX.
✅ Auto Form Reset – After adding an employee, the form resets automatically.
✅ Optimized UX – The form only appears when no employees exist; otherwise, an "Add Employee" button is shown.

# Tech Stack

Frontend
React (Functional Components, Hooks)
CSS (Dark Theme, Responsive UI)

Backend
Node.js with Express
In-Memory Database (SQLite or JSON file for simplicity)

Installation & Setup
Follow these steps to run the project locally:
1. Clone the Repository
git clone https://github.com/yourusername/employee-management-dashboard.git
cd employee-management-dashboard

2. Install Dependencies
Frontend
cd frontend
npm install

Backend
cd backend
npm install

3. Start the Application
Backend
cd backend
npm start

Frontend
cd frontend
npm start
The application will be available at http://localhost:3000.

# Usage
When no employees exist, the Add Employee Form is displayed by default.
Once an employee is added, the form disappears, and an "Add Employee" button appears at the top right.
Click "More Details" on any employee to open a modal with Edit and Delete options.
The Delete Button is disabled when editing an employee.
After updating an employee's details, the modal automatically closes.

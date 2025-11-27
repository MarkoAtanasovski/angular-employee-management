Angular Employee Management System
🚀 Features
Complete CRUD operations for employees (Create, Read, Update, Delete)

Modern Angular Material UI components

Real-time search and filtering

Pagination and column sorting

Comprehensive form validation with error messages

Loading spinners during operations

Snackbar notifications for user feedback

Responsive design for mobile and desktop

Confirmation dialogs for delete operations

🛠️ Technologies Used
Angular 17+ with Standalone Components

Angular Material for UI components

TypeScript for type safety

RxJS for reactive state management

Reactive Forms for form handling

📦 Installation & Setup
Prerequisites
Node.js (version 18 or higher)

npm or yarn

Installation Steps
bash
# Clone the repository
git clone https://github.com/MarkoAtanasovski/angular-employee-management.git

# Navigate to project directory
cd angular-employee-management

# Install dependencies
npm install

# Start development server
ng serve

# or use npm start
npm start
Access the Application
Open your browser and navigate to: http://localhost:4200

🎯 Assignment Requirements Met
Requirement	Status	Implementation
Entity Management	✅	Employee entity with full CRUD operations
Loading Spinner	✅	Shows during all data operations
Pagination	✅	MatPaginator with multiple page sizes
Update Functionality	✅	Local state management with BehaviorSubject
Angular Material Dialog	✅	Add/Edit forms in modal dialogs
Snackbar Notifications	✅	Success/error messages for all operations
Angular Material Components	✅	Comprehensive Material Design usage
English Code & Comments	✅	All code and documentation in English
User-Friendly Interface	✅	Intuitive and responsive design
📁 Project Structure
text
src/app/
├── app.component.ts          # Main application component
├── app.component.html        # Main template with table
├── app.component.scss        # Main styles
├── services/
│   └── employee.service.ts   # Employee data service with state management
├── emp-add-edit/
│   ├── emp-add-edit.ts       # Add/Edit dialog component
│   ├── emp-add-edit.html     # Dialog template
│   └── emp-add-edit.scss     # Dialog styles
├── confirm/
│   └── confirm-dialog.ts     # Delete confirmation dialog
└── core/
    └── core.ts               # Core services (Snackbar)
🎨 Key Features Detailed
Employee Management
Add Employees: Click "ADD EMPLOYEE" button to open form dialog

Edit Employees: Click edit icon on any employee row

Delete Employees: Click delete icon with confirmation

Search/Filter: Real-time filtering across all employee fields

Sorting: Click column headers to sort data

Pagination: Navigate through employee pages

Form Validation
Required field validation

Email format validation

Minimum length validation

Number range validation (experience, salary)

Real-time error messages

User Experience
Loading indicators during API calls

Success notifications for completed actions

Error messages for failed operations

Responsive design for all screen sizes

Accessible UI with proper ARIA labels

🔧 Development
Building the Project
bash
# Development build
ng build

# Production build
ng build --configuration production
Running Tests
bash
# Unit tests
ng test

# End-to-end tests
ng e2e
📝 License
This project was developed as a demonstration of Angular capabilities and assignment requirements.

👨‍💻 Author
Developed by Marko Atanasovski as part of an Angular assignment demonstrating modern web development practices.

Repository: https://github.com/MarkoAtanasovski/angular-employee-management
Live Demo: http://localhost:4200 (after running ng serve)

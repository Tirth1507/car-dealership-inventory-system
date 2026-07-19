# 🚗 Car Dealership Inventory System

This project is a full-stack Car Dealership Inventory System developed as part of the **Incubyte Software Craftsperson Internship Assessment**.

The main goal of this project is to help a car dealership manage its vehicle inventory. It allows an admin to manage cars and customers to browse and purchase available vehicles.

---

# 📖 Project Overview

The application has two different user roles:

### Admin
- Login securely
- Add new cars
- Update car details
- Delete cars
- Restock inventory
- View inventory dashboard

### Customer
- Register and Login
- Browse available cars
- Search and filter cars
- Purchase available cars

The backend is built using **FastAPI** and the frontend is developed using **React**. PostgreSQL is used to store all application data.

---

# ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Admin and Customer roles

### Car Management
- Add Car
- Edit Car
- Delete Car
- Purchase Car
- Restock Car
- Upload Car Images

### Dashboard
- Admin Dashboard
- Customer Dashboard
- Inventory Statistics
- Charts using Recharts

### Search & Filters
- Search by Make or Model
- Filter by Category
- Filter by Fuel Type
- Filter by Transmission
- Filter by Price Range

### User Interface
- Responsive Design
- Clean Dashboard
- Simple Navigation

---

# 🛠️ Technologies Used

## Frontend
- React.js
- Vite
- JavaScript
- CSS
- Axios
- React Router DOM
- Recharts

## Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

## Database
- PostgreSQL

## Testing
- Pytest

## Version Control
- Git
- GitHub

---

# 📂 Project Structure

```
car-dealership-inventory-system
│
├── backend
│   ├── app
│   ├── uploads
│   ├── tests
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── screenshots
├── README.md
├── PROMPTS.md
└── LICENSE
```

---

# ⚙️ How to Run the Project

## Clone Repository

```bash
git clone https://github.com/Tirth1507/car-dealership-inventory-system.git

cd car-dealership-inventory-system
```

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend will run on

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

# 🌐 API Endpoints

### Authentication

- POST `/auth/register`
- POST `/auth/login`

### Cars

- GET `/cars`
- GET `/cars/{id}`
- POST `/cars`
- PUT `/cars/{id}`
- DELETE `/cars/{id}`

### Inventory

- POST `/cars/{id}/purchase`
- PATCH `/cars/{id}/restock`

---

# 🧪 Running Tests

To run the backend tests:

```bash
pytest
```

To run tests with coverage:

```bash
pytest --cov=app --cov-report=term-missing
```

Current test results:

- Total Tests: 7
- Passed: 7
- Failed: 0

A screenshot of the test execution is available in the **screenshots** folder.

---

# 📸 Screenshots

Screenshots of the application are available inside the **screenshots** folder.

They include:

- Login Page
- Register Page
- Admin Dashboard
- Customer Dashboard
- Browse Cars
- Car Management
- Test Report

---

# 🤖 My AI Usage

### AI Tools Used

- ChatGPT
- Claude

### How I Used AI

I used AI as a learning and development assistant while building this project.

ChatGPT helped me with:

- Planning the project structure
- Building backend APIs
- JWT Authentication
- Debugging errors
- Writing React components
- Writing tests
- Improving project documentation

Claude helped me improve the user interface by suggesting layout changes, styling improvements, and a cleaner design.

### Reflection

AI helped me understand new concepts, debug problems faster, and improve the overall quality of the project. I reviewed, tested, and modified the generated suggestions before adding them to the project.

---

# 🌱 Future Improvements

Some features I would like to add in the future:

- Wishlist
- Online Payment
- Email Notifications
- Sales Reports
- Vehicle Reviews
- Cloud Image Storage

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Tirth Shah**

Master of Computer Science (AI & ML)

GitHub:
https://github.com/Tirth1507
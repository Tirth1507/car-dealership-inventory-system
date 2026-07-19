# 🚗 Car Dealership Inventory System

A full-stack Car Dealership Inventory System developed as part of the Incubyte Software Craftsperson Internship Assessment.

## 📖 Project Description

The Car Dealership Inventory System is a full-stack web application that helps dealerships manage vehicle inventory efficiently.

The system supports two types of users:

- **Admin** – Can manage the inventory by adding, updating, deleting, and restocking vehicles.
- **Customer** – Can browse available vehicles, search using filters, and purchase vehicles.

The project follows RESTful API architecture using FastAPI for the backend and React for the frontend, with PostgreSQL as the database.

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization (Admin & Customer)

### 🚘 Vehicle Management
- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Purchase Vehicle
- Restock Vehicle
- Upload Vehicle Images

### 📊 Dashboard
- Admin Dashboard
- Customer Dashboard
- Inventory Statistics
- Charts using Recharts

### 🔍 Search & Filtering
- Search by Make and Model
- Filter by Category
- Filter by Fuel Type
- Filter by Transmission
- Filter by Price Range

### 🎨 User Interface
- Responsive Design
- Modern Dashboard
- Customer-Friendly Interface

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS3
- Axios
- React Router DOM
- Recharts

### Backend
- Python
- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic

### Database
- PostgreSQL

### Testing
- Pytest
- SQLite (Testing Database)

### Version Control
- Git
- GitHub

## 📂 Project Structure

```
Car-Dealership-Inventory-System
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
├── README.md
└── PROMPTS.md
```

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/Tirth1507/car-dealership-inventory-system.git

cd car-dealership-inventory-system
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```
http://localhost:5173
```


## 🌐 API Endpoints

### Authentication

- POST `/auth/register`
- POST `/auth/login`

### Vehicles

- GET `/cars`
- GET `/cars/{id}`
- POST `/cars`
- PUT `/cars/{id}`
- DELETE `/cars/{id}`

### Inventory

- POST `/cars/{id}/purchase`
- PATCH `/cars/{id}/restock`


## 🧪 Running Tests

Run all backend tests:

```bash
pytest
```

Run tests with coverage:

```bash
pytest --cov=app --cov-report=term-missing
```

The project includes tests for:

- Authentication
- Vehicle CRUD Operations
- Purchase
- Restock

## 📸 Application Screenshots
- Take A Look In Screenshots Folder.

## 🤖 My AI Usage

### AI Tools Used

- ChatGPT (OpenAI)
- Claude (Anthropic)

### How I Used AI

I used AI as a development assistant throughout this project.

**ChatGPT** helped me with:

- Designing the overall project architecture
- Building the FastAPI backend
- Implementing JWT authentication and role-based authorization
- Developing React components and application logic
- Debugging frontend and backend issues
- Creating SQLAlchemy database models
- Writing unit tests using Pytest
- Improving code quality and project structure
- Writing project documentation

**Claude** was primarily used for:

- Improving the user interface design
- Refining layouts and component styling
- Suggesting responsive UI improvements
- Enhancing the overall user experience

### Reflection

AI tools significantly improved my development workflow by helping me understand concepts, explore implementation approaches, debug issues, and refine the user interface. All AI-generated suggestions were carefully reviewed, tested, and adapted before being incorporated into the final project.


## 🌱 Future Improvements

- Vehicle Wishlist
- Online Payment Integration
- Email Notifications
- Sales Reports
- Vehicle Reviews
- Cloud Image Storage


## 👨‍💻 Author

**Tirth Shah**

Master of Computer Science (AI & ML)

GitHub: https://github.com/Tirth1507
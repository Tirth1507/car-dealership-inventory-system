# PROMPTS.md

# AI Tooling Chat History

This document contains the major prompts used while developing the Car Dealership Inventory System. AI was used as a development assistant to help with architecture, implementation, debugging, testing, UI improvements, and documentation.

---

## Prompt 1 - Project Planning

**Prompt**

Help me design a full-stack Car Dealership Inventory System for the Incubyte Software Craftsperson Internship assessment. Suggest an appropriate project architecture, technology stack, and folder structure.

**Outcome**

- Finalized React + FastAPI + PostgreSQL architecture
- Planned backend and frontend folder structure
- Defined project modules

---

## Prompt 2 - Authentication

**Prompt**

Help me implement JWT authentication with role-based authorization using FastAPI. The application should support Admin and Customer roles.

**Outcome**

- User Registration
- Login
- JWT Authentication
- Password Hashing
- Role-Based Access Control

---

## Prompt 3 - Vehicle CRUD Operations

**Prompt**

Help me implement complete CRUD operations for vehicle management using FastAPI and SQLAlchemy.

**Outcome**

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- View Vehicle Details

---

## Prompt 4 - Database Design

**Prompt**

Help me design the SQLAlchemy models for users and vehicles and establish relationships with PostgreSQL.

**Outcome**

- User Model
- Vehicle Model
- Database Relationships

---

## Prompt 5 - Image Upload

**Prompt**

Help me implement image upload functionality using FastAPI so that vehicle images can be uploaded and displayed in the React frontend.

**Outcome**

- File Upload API
- Static File Serving
- Image Preview in Frontend

---

## Prompt 6 - React Frontend

**Prompt**

Help me build the React frontend using Vite with routing, authentication, and reusable components.

**Outcome**

- Login Page
- Register Page
- Protected Routes
- Admin Dashboard
- Customer Dashboard

---

## Prompt 7 - Dashboard

**Prompt**

Help me build an Admin Dashboard that displays inventory statistics and charts using Recharts.

**Outcome**

- Total Cars
- Available Cars
- Sold Cars
- Inventory Status Chart
- Top Vehicle Makes Chart

---

## Prompt 8 - Search & Filters

**Prompt**

Help me implement search and filtering functionality for vehicles using React.

**Outcome**

- Search by Make
- Search by Model
- Category Filter
- Fuel Type Filter
- Price Filter

---

## Prompt 9 - Purchase & Restock

**Prompt**

Help me implement purchase and restock functionality while maintaining inventory quantity and status.

**Outcome**

- Purchase Vehicle
- Restock Vehicle
- Quantity Updates
- Inventory Management

---

## Prompt 10 - Testing

**Prompt**

Help me write unit tests using Pytest for authentication and vehicle APIs.

**Outcome**

- Authentication Tests
- CRUD Tests
- Purchase Tests
- Restock Tests

---

## Prompt 11 - Debugging

**Prompt**

Help me debug backend and frontend issues including API errors, authentication issues, routing problems, and UI bugs.

**Outcome**

Resolved multiple issues related to:

- JWT Authentication
- Database Operations
- API Integration
- React Routing
- Form Validation
- UI Rendering

---

## Prompt 12 - UI Improvements

**Prompt**

Help me improve the application's UI to make it modern, responsive, and visually appealing.

**Outcome**

- Responsive Layout
- Dashboard Cards
- Better Navigation
- Improved Forms
- Consistent Theme
- Better User Experience

---

## Prompt 13 - Documentation

**Prompt**

Help me write a professional README.md and prepare all documentation required for the Incubyte assessment.

**Outcome**

- README.md
- PROMPTS.md
- AI Usage Documentation
- Setup Instructions

---

# Reflection

AI tools were used to assist with learning, debugging, planning, and improving the project. All generated code and suggestions were reviewed, tested, modified where necessary, and integrated by me into the final application.
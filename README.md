# Truck Bazar

Truck Bazar is a full-stack web application for buying and selling second-hand trucks. It connects sellers who want to sell their old trucks or vehicles with buyers, small businesses, and new entrepreneurs looking for affordable second-hand trucks.

The platform includes both a client-side application and a server-side API with secure authentication, role-based authorization, product management, and payment integration.

---

## Project Overview

Truck Bazar was built to create a reliable marketplace for second-hand trucks. Many truck owners struggle to sell their used vehicles, while many buyers want to start or expand their business with limited capital. This platform helps both parties connect and benefit from each other.

This project consists of two parts:

- **Client Side** – the frontend application where users can browse, buy, and manage products
- **Server Side** – the backend API and database integration for authentication, authorization, and product management

---

# Client Side Repository

An interactive frontend application for buying and selling second-hand trucks. It provides authentication, product browsing, dashboard access, private routes, and online payment features.

## Features

- User authentication with:
  - Email and password
  - Google sign-in using Firebase
- Image uploading system
- Private routes for:
  - Dashboard
  - Product Categories
- Role-based routes:
  - **Admin Route**
  - **Seller Route**
- User state management using React Context API
- Payment gateway integration with Stripe
- JWT-based secure user access
- `useAuthStateChange` implementation for managing user session state
- `unsubscribe` functionality to prevent memory leaks

## Live Link

- **Hosted on Firebase** → Truck Bazar

## Technologies Used

- **React** – 18.2.0
- **React Router** – 6.4.2
- **React Hook Form** – 7.39.7
- **React Query** – 3.39.2
- **React Toastify** – 9.0.8
- **Date-fns** – 2.29.3
- **MongoDB Atlas** – MongoDB 6.0
- **Stripe** – 2022-11-15
- **Firebase** – 10.1.0

## Resources & Credits

- **Tailwind Components** → Kitwind, Mamba UI, DaisyUI
- **Icons** → React Icons
- **FavIcon** → Freepik
- **Images** → Freepik

---

# Server Side Repository

The backend service and database integration for Truck Bazar. It manages products, categories, authentication, authorization, and secure API access for users, admins, and sellers.

## Features

- Built with **Express.js**
- Category-wise product data management
- Service/product details data handling
- JWT-based user verification and secure API access
- Middleware-based route protection
- CORS integration to handle cross-platform requests
- Environment variable management using dotenv
- Hosted on Vercel
- Acts as a secure bridge between the client side and database

## Live Links

- **Hosted on Vercel** → truck-bazar-server-side-projects
- **Project Link on Vercel** → project link

## Technologies Used

- **Express.js** – 4.18.2
- **Nodemon** – 2.0.20
- **Vercel** – 28.4.12
- **Vercel CLI** – 28.4.12
- **MongoDB Atlas** – MongoDB 6.0
- **jsonwebtoken** – 8.5.1
- **dotenv**
- **cors**

---

# Core Functionalities

Across both client and server sides, the Truck Bazar project includes:

- Full-stack integration between frontend and backend
- Secure authentication and authorization
- JWT token-based protected access
- Role-based dashboard system for admin and seller
- Product/category management
- Payment integration with Stripe
- Cloud hosting with Firebase and Vercel
- MongoDB Atlas database integration

---

# Purpose of the Project

The goal of Truck Bazar is to provide a practical and affordable marketplace for second-hand truck trading. It helps:

- **Sellers** sell their old trucks more easily
- **Buyers** find affordable second-hand trucks
- **Small companies and entrepreneurs** start or expand their business with lower investment

If the demand for the website grows, the platform can be expanded with more features and a larger operational scale.

---

# Author Note

This project was built with a focus on solving a real-world problem through a secure and scalable full-stack web application. If you'd like to know more about the project, feel free to explore the live links and repositories.

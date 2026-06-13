# DevPulse Issue Tracker API

## Project Overview

DevPulse Issue Tracker API is a backend application built to manage bug reports and feature requests within a development team. It includes user authentication, role-based authorization, and issue management functionalities.

## Live URL

Live API: [https://assign-2-ruddy.vercel.app/](https://assign-2-fatematuzzohora070-9819-fatemas-projects-19d467a5.vercel.app/)

## Features

* User Registration
* User Login with JWT Authentication
* Password Hashing using bcryptjs
* Role-Based Authorization (Contributor & Maintainer)
* Create, Read, Update, and Delete Issues
* Protected Routes using Middleware
* PostgreSQL Database Integration

## Technology Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Neon Database
* JWT (JSON Web Token)
* bcryptjs
* Vercel

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/FatemaTuzZohoraa/PH-L2-Assign-2
```

### Install Dependencies

```bash
npm install
```


### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Issues

* POST `/api/issues`
* GET `/api/issues`
* GET `/api/issues/:id`
* PATCH `/api/issues/:id`
* DELETE `/api/issues/:id`

## Database Schema Summary

### Users

Stores user information including name, email, password, role, and timestamps.

### Issues

Stores issue information including title, description, type, status, reporter ID, and timestamps.

## Author

Fatema Tuz Zohora

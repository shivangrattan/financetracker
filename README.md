# FinanceTracker - Personal Finance Tracker

A full-stack personal finance management application built with Spring Boot, React, and PostgreSQL.

## Features

- [x] **CRUD Operations**: Create, Read, Update, and Delete transactions
- [x] **Dashboard**: View financial summary with total income, expenses, and balance
- [x] **Transaction Types**: Track both income and expense transactions
- [x] **Categories**: Organize transactions by categories
- [x] **Date Tracking**: Track transactions by date
- [x] **Sort**: Sort transactions by type, category, and date range
- [x] **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack
| Area       | Technologies                                                                          |
| :--------- | :------------------------------------------------------------------------------------ |
| Backend | Spring Boot 4.0.1, Java 21, Maven, Hibernate, Spring Data JPA, Spring Web, Lombok |
| Frontend | React, CSS, AXios, date-fns, Recharts |
| Database | PostgreSQL |

## Setup Instructions

### 1. Database Setup

Run the provided docker compose file to start the PostgreSQL database:

```bash
docker compose up -d
```

If PostgreSQL is locally installed, create a database:

```bash
createdb finance_db
```

If using a client, run:

```sql
CREATE DATABASE finance_db;
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd financetracker/backend
```

Update `src/main/resources/application.properties` if needed.

Build the project:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd financetracker/frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will open at `http://localhost:3000`

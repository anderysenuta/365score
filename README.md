# 365score

> **Note:** This is a test assignment project.

## Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture documentation, tech stack rationale, and design principles
- **[Database Structure](./data_structure.svg)** - Visual representation of database schema
- **[Interactive DB Diagram](https://dbdiagram.io/d/690defb56735e11170bd5cf5)** - Explore database relationships

## Quick Start

### 1. Database (Docker)
```bash
cd backend

# Start PostgreSQL with Docker Compose
docker-compose up -d

# Database will be available at localhost:5432
# Migrations run automatically on first start
```

### 2. Seed Database
```bash
# (from backend folder)
# Seed questions from football_quiz_100.json
npm run seed
```

### 3. Backend
```bash
# (from backend folder)
npm ci

# Copy environment variables
cp .env.example .env

npm start
```

### 4. Frontend
```bash
cd frontend
npm ci
npm run dev
```

### Stop Database
```bash
cd backend
docker-compose down
```


## Project Structure

- `frontend/` - React 19 application with Vite
- `backend/` - Pure Node.js backend (no frameworks)
- `ARCHITECTURE.md` - Complete architecture documentation
- `data_structure.svg` - Database schema visualization

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- React Router
- Radix UI

**Backend:**
- Node.js (pure, no frameworks)
- PostgreSQL
- TypeScript
- Custom HTTP router
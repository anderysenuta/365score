# Architecture Documentation

## Tech Stack Rationale

**Core Philosophy:** Create a minimalistic application with minimal dependencies.

### Frontend
- **React 19** - Chosen as the most popular and minimalistic framework on the market
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Radix UI** - Accessible UI components
- **TypeScript** - Type safety

### Backend
- **Node.js (pure)** - Built from scratch without frameworks as per requirements
- **PostgreSQL** - Relational database with transaction support
- **pg** - PostgreSQL client for Node.js (minimal, essential dependency)
- **TypeScript** - Type safety with native support (--experimental-strip-types)
- **http-status-codes** - Standardized HTTP status codes
- **@exodus/schemasafe** - Lightweight JSON schema validation

## Project Structure

```
365score/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── welcome/   # Welcome page
│   │   │   ├── question/  # Question page
│   │   │   └── finish/    # Finish page
│   │   ├── components/    # Reusable components
│   │   │   ├── loader/
│   │   │   ├── protectedRoute/
│   │   │   └── publicRoute/
│   │   ├── contexts/      # React contexts
│   │   │   └── UserContext.tsx
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Root component
│   └── package.json
│
└── backend/               # Node.js backend application
    ├── src/
    │   ├── controllers/   # Request handlers
    │   │   └── question/
    │   │       ├── create-question/
    │   │       │   ├── create-question.controller.ts
    │   │       │   ├── create-question.service.ts
    │   │       │   ├── create-question.schema.ts
    │   │       │   └── __tests__/
    │   │       └── get-question/
    │   ├── services/      # External services
    │   │   └── postgres/
    │   │       └── postgres.service.ts
    │   ├── middlewares/   # HTTP middlewares
    │   │   └── cors.middleware.ts
    │   ├── utils/         # Utility functions
    │   │   ├── router/
    │   │   │   └── router.ts
    │   │   ├── middleware/
    │   │   │   └── compose.ts
    │   │   └── validateSchema/
    │   ├── routes.ts      # Route definitions
    │   └── index.ts       # Application entry point
    ├── migrations.sql     # Database schema
    └── package.json
```

## Backend Architecture

### Router Implementation

Custom lightweight HTTP router built from scratch:

```typescript
type Route = [Method, string, RouteHandler];

// Example:
['POST', '/questions', createQuestionController]
```

**Features:**
- URL parameter extraction: `/questions/{id}`
- Query string parsing: `?page=1&limit=10`
- Request body parsing (JSON)

### Controller Pattern

Controllers receive normalized events and return structured responses:

```typescript
type ControllerEvent = {
  method: string;
  body: any;
  params: Record<string, string>;
  query: Record<string, string>;
};

type ControllerResponse = {
  body: any;
  statusCode?: number;      // Default: 200
  headers?: Record<string, string>;
};
```

### Service Layer

Services handle business logic and database operations:

```typescript
// Example: Transaction-based question creation
export const createQuestionService = async (input) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Insert question
    const questionResult = await client.query(insertQuestionQuery, [input.question]);

    // 2. Insert options
    for (const option of input.options) {
      await client.query(insertOptionsQuery, [questionId, option.value, option.isCorrect]);
    }

    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
```

### Middleware System

Composable middleware chain with explicit composition:

```typescript
// index.ts
const app = composeMiddleware(
  [
    corsMiddleware,
    // add more middleware here
  ],
  router
);
```

**Execution Flow:**
```
Request → CORS → [other middlewares] → Router → Controller → Response
```

### Database Layer

**Connection Pool:**
- Initialized on application startup
- Connection pool management via `pg.Pool`
- Transaction support for atomic operations

**Schema:**
- `questions` - Quiz questions
- `questions_options` - Question answer options with FK to questions

## Frontend Architecture

### Page Structure

**Three main pages:**
1. **Welcome Page** - User registration/login
2. **Question Page** - Quiz interface
3. **Finish Page** - Results display

### Routing

```typescript
// Protected and public routes
<Route path="/welcome" element={<PublicRoute><WelcomePage /></PublicRoute>} />
<Route path="/question" element={<ProtectedRoute><QuestionPage /></ProtectedRoute>} />
<Route path="/finish" element={<ProtectedRoute><FinishPage /></ProtectedRoute>} />
```

### State Management

- **UserContext** - Global user state
- React hooks for local state

### Component Organization

```
components/
├── loader/           # Loading indicators
├── protectedRoute/   # Auth-required routes
└── publicRoute/      # Public routes
```

## API Design

### Request/Response Flow

```
Client Request
    ↓
Middleware (CORS, ...)
    ↓
Router (parse URL, body, query)
    ↓
Controller (validation, business logic)
    ↓
Service (database operations)
    ↓
Controller (format response)
    ↓
Client Response
```

### Error Handling

**Controller Level:**
- Validates input
- Returns appropriate status codes
- Handles service errors gracefully

**Service Level:**
- Throws errors on failure
- Manages database transactions
- Ensures data consistency

**Router Level:**
- Catches unhandled errors
- Returns 500 Internal Server Error
- Logs errors for debugging

## Future Improvements

- Add authentication/authorization
- Implement request rate limiting
- Add API documentation (OpenAPI/Swagger)
- Implement caching layer
- Add logging middleware
- Database migration management
- CI/CD pipeline
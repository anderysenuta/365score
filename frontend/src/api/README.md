# API Layer Documentation

## Structure

```
api/
├── client.ts         # Fetch wrapper with error handling
├── types.ts          # TypeScript types for API
├── questions.api.ts  # Questions endpoints
├── users.api.ts      # Users endpoints
└── quizzes.api.ts    # Quizzes endpoints

hooks/
├── useFetch.ts       # Universal fetch hook
├── useQuestions.ts   # Questions hooks
├── useUsers.ts       # Users hooks
└── useQuizzes.ts     # Quizzes hooks
```

## Philosophy

**Keep it simple!** One hook (`useFetch`) for all API calls.

## Usage Examples

### Example 1: Simple GET request

```tsx
import { useQuestion } from '../hooks/useQuestions';

function QuestionPage() {
  const { data, isLoading, error, isSuccess } = useQuestion('123');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (isSuccess) return <div>{data?.question}</div>;

  return null;
}
```

### Example 2: POST request with useFetch

```tsx
import { useCreateUser } from '../hooks/useUsers';

function WelcomePage() {
  const { execute, isLoading, error, data } = useCreateUser();

  const handleSubmit = async (name: string) => {
    try {
      await execute({ name });
      // data will be available after success
      console.log('User created:', data);
    } catch (err) {
      console.error('Failed:', err);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(e.currentTarget.userName.value);
    }}>
      <input name="userName" />
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Start Quiz'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
}
```

### Example 3: Submit answer

```tsx
import { useSubmitAnswer } from '../hooks/useQuizzes';

function QuestionPage() {
  const { execute, isLoading } = useSubmitAnswer();

  const handleAnswer = async (optionId: number) => {
    try {
      await execute({
        quizId: 1,
        questionId: 2,
        selectedOptionId: optionId,
      });
      // Navigate to next question
    } catch (err) {
      alert('Failed to submit answer');
    }
  };

  return (
    <button onClick={() => handleAnswer(1)} disabled={isLoading}>
      Option 1
    </button>
  );
}
```

## Hook API

### useFetch - for GET requests

```typescript
const { data, isLoading, error, isSuccess, isError } = useFetch(
  () => apiFunction(),
  { enabled: true } // auto-fetch on mount
);
```

### useFetch - for POST/PATCH/DELETE requests

```typescript
const { execute, data, isLoading, error, isSuccess, isError } = useFetch(
  (variables) => apiFunction(variables)
  // enabled defaults to false - manual trigger via execute()
);

// Trigger manually
await execute({ name: 'John' });
```

**Returns:**
- `data: T | null` - Response data
- `isLoading: boolean` - Loading state
- `error: Error | null` - Error object
- `isSuccess: boolean` - Success flag
- `isError: boolean` - Error flag
- `execute: (variables?) => Promise<void>` - Manual trigger function

## Environment Variables

Create `.env` file in frontend root:

```env
VITE_API_URL=http://localhost:3000
```

## Error Handling

All API errors are instances of `APIError`:

```typescript
try {
  await mutate({ name: 'John' });
} catch (error) {
  if (error instanceof APIError) {
    console.log('Status:', error.status);
    console.log('Data:', error.data);
  }
}
```
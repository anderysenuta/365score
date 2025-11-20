import { useState, useEffect, useCallback } from 'react';

type UseFetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
  isError: boolean;
};

type UseFetchOptions = {
  enabled?: boolean; // Auto-fetch on mount (default: true for GET, false for mutations)
};

type UseFetchReturn<T, TVariables = void> = UseFetchState<T> & {
  execute: TVariables extends void ? () => Promise<void> : (variables: TVariables) => Promise<void>;
};

// For GET requests (auto-fetch)
export function useFetch<T>(apiFn: () => Promise<T>, options?: UseFetchOptions): UseFetchReturn<T, void>;

// For POST/PATCH/DELETE requests (manual trigger)
export function useFetch<T, TVariables = void>(
  apiFn: (variables: TVariables) => Promise<T>,
  options?: UseFetchOptions
): UseFetchReturn<T, TVariables>;

export function useFetch<T, TVariables = void>(
  apiFn: (variables?: TVariables) => Promise<T>,
  options: UseFetchOptions = {}
): UseFetchReturn<T, TVariables> {
  const { enabled = false } = options; // Default false - manual trigger

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (variables?: TVariables) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiFn(variables as TVariables);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        throw err; // Re-throw for handling in component
      } finally {
        setIsLoading(false);
      }
    },
    [apiFn]
  );

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (enabled) {
      execute();
    }
  }, [enabled, execute]);

  return {
    data,
    isLoading,
    error,
    isSuccess: data !== null && error === null,
    isError: error !== null,
    execute: execute as any,
  };
}
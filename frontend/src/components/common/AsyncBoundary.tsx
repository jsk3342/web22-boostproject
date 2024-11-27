import { forwardRef, useImperativeHandle, useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AsyncBoundaryProps {
  pendingFallback: React.ReactNode;
  rejectedFallback: (error: Error) => React.ReactNode;
  children: React.ReactNode;
}

export const AsyncBoundary = forwardRef<any, AsyncBoundaryProps>(
  ({ pendingFallback, rejectedFallback, children }, ref) => {
    const [error, setError] = useState<Error | null>(null);

    // Use `useImperativeHandle` to expose a `reset` method to parent components
    useImperativeHandle(ref, () => ({
      reset: () => setError(null)
    }));

    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      setError(error);
      console.error('ErrorBoundary caught an error', error, errorInfo);
    };

    return (
      <ErrorBoundary FallbackComponent={({ error }) => rejectedFallback(error)} onError={handleError}>
        <Suspense fallback={pendingFallback}>{children}</Suspense>
      </ErrorBoundary>
    );
  }
);

AsyncBoundary.displayName = 'AsyncBoundary';

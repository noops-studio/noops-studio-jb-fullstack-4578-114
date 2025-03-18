// Custom error types
export class AppError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AppError';
    }
  }
  
  export class NetworkError extends AppError {
    constructor(message: string, public statusCode?: number) {
      super(message);
      this.name = 'NetworkError';
    }
  }
  
  export class ValidationError extends AppError {
    constructor(message: string, public field?: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  // Type guard to check if an error is an instance of AppError
  export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
  }
  
  // Helper function to handle errors
  export function handleError(error: unknown): string {
    if (isAppError(error)) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
  
  // API error handler
  export async function handleApiError<T>(
    promise: Promise<T>
  ): Promise<[T | null, string | null]> {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      return [null, handleError(error)];
    }
  }
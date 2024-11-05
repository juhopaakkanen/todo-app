interface AsyncStateWrapperProps {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
  loadingMessage?: string;
  errorMessage?: string;
}

export const AsyncStateWrapper = ({
  isLoading,
  error,
  children,
  loadingMessage = 'Loading...',
  errorMessage = 'Error:',
}: AsyncStateWrapperProps) => {
  if (isLoading) return <div>{loadingMessage}</div>;
  if (error)
    return (
      <div>
        {errorMessage} {error.message}
      </div>
    );
  return <>{children}</>;
};

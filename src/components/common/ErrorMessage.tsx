interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="p-4 text-center text-red-500 rounded-md bg-red-50">
    Error: {message}
  </div>
);

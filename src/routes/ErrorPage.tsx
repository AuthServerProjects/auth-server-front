import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let message = "خطایی رخ داده است";
  let status = 500;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-500">{status}</h1>
      <p className="text-gray-600 mt-2">{message}</p>
      <Link to="/" className="mt-4 text-blue-600 hover:underline">
        بازگشت به خانه
      </Link>
    </div>
  );
};

export default ErrorPage;

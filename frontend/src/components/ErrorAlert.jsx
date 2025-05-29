// src/components/ErrorAlert.jsx
const ErrorAlert = ({ message }) => {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
        <p className="text-red-700">{message}</p>
      </div>
    );
  };
  
  export default ErrorAlert;
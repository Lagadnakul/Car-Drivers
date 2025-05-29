// src/components/LoadingSpinner.jsx
const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>  
      </div>
    );
  };
  
  export default LoadingSpinner;
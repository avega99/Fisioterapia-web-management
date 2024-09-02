
const LoadingIndicator = () => {
    return (
        <div className="flex flex-1 w-full h-full items-center justify-center">
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    );
};

export default LoadingIndicator;

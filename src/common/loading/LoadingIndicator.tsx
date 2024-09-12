interface Props {
    isFullScreen?: boolean;
}

const LoadingIndicator = ({ isFullScreen = false }: Props) => {
    return (
        <div className={`flex flex-1 ${isFullScreen ? "h-screen w-screen" : "w-full h-full "} items-center justify-center`}>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    );
};

export default LoadingIndicator;

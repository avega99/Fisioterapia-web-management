const ErrorMessage = () => {
    return (
        <div className="flex flex-1 items-center h-full  justify-center flex-col">
            <h1 className="text-error text-2xl">Error al cargar los datos</h1>
            <h3 className="max-w-96 text-center mt-3">
                Hubo un problema al obtener la información. Esto puede deberse a una conexión inestable o un error en el servidor.
            </h3>
        </div>
    );
};

export default ErrorMessage;

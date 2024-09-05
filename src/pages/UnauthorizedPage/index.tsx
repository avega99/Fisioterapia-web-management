import unauthorized from "@/assets/icons/unauthorized.png";

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-1 h-screen w-screen justify-center items-center flex-col gap-9 p-10">
            <img src={unauthorized} alt="Unauthorized" className="max-w-96 w-full h-auto" />
            <h1 className="text-5xl max-w-96  text-center text-error font-bold">Acceso Denegado</h1>
            <h4 className="text-center font-semibold">No tienes permiso para acceder a esta página.</h4>
        </div>
    );
};

export default UnauthorizedPage;

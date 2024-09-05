import NotFound from "@/assets/icons/404-error.png";

const NotFoundPage = () => {
    return (
        <div className="flex flex-1 h-screen w-screen justify-center items-center flex-col gap-9 p-10">
            <img src={NotFound} alt="Unauthorized" className="max-w-96 w-full h-auto" />
            <h1 className="text-5xl max-w-96  text-center text-error font-bold">Página no encontrada</h1>
            <h4 className="text-center font-semibold">Lo sentimos, pero la página que estás buscando no existe o ha sido movida.</h4>
        </div>
    );
};

export default NotFoundPage;

import { useForm } from "react-hook-form";
import Input from "../../common/Input";
import Textarea from "../../common/Textarea";
import TitleCard from "../../common/TitleCard";
import ErrorText from "../../common/ErrorText";
import { ICheckupForm } from "../../global/checkups.types";

const AddNewCheckupPage = () => {
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<ICheckupForm>();

    const onSubmit = (data: ICheckupForm) => {
        console.log({ data });
    };
    return (
        <div>
            <TitleCard title="Agregar consulta">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input {...register("playerId", { required: true })} label="Jugador" />
                            {errors.notes && <ErrorText>El jugador es requerido</ErrorText>}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid grid-cols-1  gap-6">
                        <div>
                            <Textarea {...register("notes", { required: true })} label="Tratamiento y observaciones" placeholder="Observaciones" />
                            {errors.notes && <ErrorText>Las notas son requeridas</ErrorText>}
                        </div>
                        <div>
                            <Textarea {...register("tests", { required: true })} label="Tests" placeholder="tests" />
                            {errors.tests && <ErrorText>Los tests son requeridos</ErrorText>}
                        </div>
                        <div>
                            <Textarea {...register("results", { required: true })} label="Resultados" placeholder="resultados" />
                            {errors.results && <ErrorText>Los resultados son requeridos</ErrorText>}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <input
                                {...register("assets", { required: true })}
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                            {errors.assets && <ErrorText>Al menos una imagen o video es requerido</ErrorText>}
                        </div>
                    </div>
                    <div className="mt-16">
                        <button type="submit" className="btn btn-primary float-right">
                            Enviar
                        </button>
                    </div>
                </form>
            </TitleCard>
        </div>
    );
};

export default AddNewCheckupPage;

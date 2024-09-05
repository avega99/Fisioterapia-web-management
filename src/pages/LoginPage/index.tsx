import LoginIntro from "./components/LoginIntro";
import { useForm } from "react-hook-form";
import { ILogin } from "../../global/auth.types";
import { loginService } from "../../services/auth";
import axios from "axios";
import { IResponse } from "../../global/common.types";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Input from "@/common/inputs/Input";
import ErrorText from "@/common/texts/ErrorText";

const LoginPgae = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const persists = useAuthStore((state) => state.persists);
    const togglePersist = useAuthStore((state) => state.togglePersist);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const form = useForm<ILogin>();

    const loginMutuation = useMutation({
        mutationFn: loginService,
        mutationKey: ["login"],
        onSuccess: ({ data }) => {
            setUser(data);
            navigate(from, { replace: true });
        },
    });

    const onSubmit = (data: ILogin) => {
        loginMutuation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className="">
                        <LoginIntro />
                    </div>
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <div>
                                    <Input placeholder="" type="email" label="Correo" containerStyle="mt-4" {...form.register("email", { required: true })} />
                                    {form.formState.errors.email && <ErrorText className="text-left mt-1">El correo es requerido</ErrorText>}
                                </div>
                                <div>
                                    <Input
                                        placeholder=""
                                        type="password"
                                        label="Contraseña"
                                        containerStyle="mt-4"
                                        {...form.register("password", { required: false })}
                                    />
                                    {form.formState.errors.password && <ErrorText className="text-left mt-1">La contraseña es requerida</ErrorText>}
                                </div>

                                <div className="mt-2">
                                    <input type="checkbox" id="persist" onChange={togglePersist} checked={persists} />
                                    <label className="ml-2" htmlFor="persist">
                                        Confiar en este dispositivo
                                    </label>
                                </div>
                            </div>

                            {/* <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div> */}

                            {axios.isAxiosError<IResponse<undefined>, Record<string, unknown>>(loginMutuation.error) ? (
                                <>
                                    {loginMutuation.error.code == "ERR_NETWORK" ? (
                                        <ErrorText>No hubo respuesta del servidor</ErrorText>
                                    ) : (
                                        <ErrorText>{loginMutuation.error.response?.data.message}</ErrorText>
                                    )}
                                </>
                            ) : (
                                loginMutuation.isError && <ErrorText>No server response</ErrorText>
                            )}
                            <button type="submit" className={"btn mt-2 w-full btn-primary"} disabled={loginMutuation.isPending}>
                                Login
                            </button>

                            {/* <div className="text-center mt-4">
                                Don't have an account yet?{" "}
                                <Link to="/register">
                                    <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Register
                                    </span>
                                </Link>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPgae;

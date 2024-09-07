import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPgae from "./pages/LoginPage/index.tsx";
import Layout from "./container/layout/index.tsx";
import HomePage from "./pages/HomePage/index.tsx";
import PlayersPage from "./pages/PlayersPage/index.tsx";
import UsersPage from "./pages/UsersPage/index.tsx";
import UnauthorizedPage from "./pages/UnauthorizedPage/index.tsx";
import { USER_ROLE } from "./global/user.types.ts";
import AddNewCheckupPage from "./pages/AddNewCheckupPage/index.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CheckupDetailsPage from "./pages/CheckupDetailsPage/index.tsx";
import PersistLogin from "./common/auth/PersistLogin.tsx";
import RequireAuth from "./common/auth/RequiredAuth.tsx";
import EditCheckupPage from "./pages/EditCheckupPage/index.tsx";
import NotFoundPage from "./pages/NotFoundPage/index.tsx";
import EditCheckupAssetsPage from "./pages/EditCheckupAssetsPage/index.tsx";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider } from "react-photo-view";
import ProfilePage from "./pages/ProfilePage/index.tsx";
import PlayerDetailsPage from "./pages/PlayerDetailsPage/index.tsx";
import UserDetailsPage from "./pages/UserDetailsPage/index.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: { retry: false },
        queries: { retry: false, refetchOnWindowFocus: false, staleTime: 120000 },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PhotoProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<PersistLogin />}>
                            <Route path="/" element={<Layout />}>
                                <Route element={<RequireAuth allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.READ, USER_ROLE.SUPER_ADMIN, USER_ROLE.WRITE]} />}>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="jugadores" element={<PlayersPage />} />
                                    <Route path="/consulta/:id" element={<CheckupDetailsPage />} />
                                    <Route path="/perfil" element={<ProfilePage />} />
                                    <Route path="/jugador/:id" element={<PlayerDetailsPage />} />
                                </Route>
                                <Route element={<RequireAuth allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.WRITE]} />}>
                                    <Route path="agregar-consulta" element={<AddNewCheckupPage />} />
                                    <Route path="editar-consulta/:id" element={<EditCheckupPage />} />
                                    <Route path="editar-consulta-assets/:id" element={<EditCheckupAssetsPage />} />
                                </Route>
                                <Route element={<RequireAuth allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN]} />}>
                                    <Route path="usuarios" element={<UsersPage />} />
                                    <Route path="usuario/:id" element={<UserDetailsPage />} />
                                </Route>
                            </Route>
                            <Route path="/unauthorized" element={<UnauthorizedPage />} />
                        </Route>
                        <Route path="/login" element={<LoginPgae />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </PhotoProvider>
            <Toaster position="top-right" />
        </QueryClientProvider>
    </StrictMode>
);

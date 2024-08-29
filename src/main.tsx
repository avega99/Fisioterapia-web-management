import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPgae from "./pages/LoginPage/index.tsx";
import Layout from "./container/layout/index.tsx";
import HomePage from "./pages/HomePage/index.tsx";
import PlayersPage from "./pages/PlayersPage/index.tsx";
import UsersPage from "./pages/UsersPage/index.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import RequireAuth from "./common/RequiredAuth.tsx";
import UnauthorizedPage from "./pages/UnauthorizedPage/index.tsx";
import { USER_ROLE } from "./global/user.types.ts";
import PersistLogin from "./common/PersistLogin.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: { retry: false },
        queries: { retry: false },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<PersistLogin />}>
                        <Route path="/" element={<Layout />}>
                            <Route element={<RequireAuth allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.READ, USER_ROLE.SUPER_ADMIN, USER_ROLE.WRITE]} />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="jugadores" element={<PlayersPage />} />
                            </Route>
                            <Route element={<RequireAuth allowedRoles={[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN]} />}>
                                <Route path="usuarios" element={<UsersPage />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="/login" element={<LoginPgae />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);

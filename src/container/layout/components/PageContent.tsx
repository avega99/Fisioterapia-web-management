import { useRef } from "react";

import Header from "./Header";
import { Outlet } from "react-router-dom";

const PageContent = () => {
    const mainContentRef = useRef<HTMLElement | null>(null);

    return (
        <div className="drawer-content flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6  bg-base-200" ref={mainContentRef}>
                <Outlet />
            </main>
        </div>
    );
};

export default PageContent;

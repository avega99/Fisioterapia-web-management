import PageContent from "./components/PageContent";
import Sidebar from "./components/Sidebar";
import ModalLayout from "./components/ModalLayout";

const Layout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <PageContent />
                <Sidebar />
            </div>
            <ModalLayout />
        </div>
    );
};

export default Layout;

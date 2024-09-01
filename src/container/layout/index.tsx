import PageContent from "./components/PageContent";
import Sidebar from "./components/Sidebar";
import ModalLayout from "./components/ModalLayout";
import { Fragment } from "react/jsx-runtime";

const Layout = () => {
    // const {} = useHeaderStore((state) => state);

    // useEffect(() => {
    //     if (newNotificationMessage !== "") {
    //         if (newNotificationStatus === 1) NotificationManager.success(newNotificationMessage, "Success");
    //         if (newNotificationStatus === 0) NotificationManager.error(newNotificationMessage, "Error");
    //         removeNotificationMessage();
    //     }
    // }, [newNotificationMessage]);

    return (
        <Fragment>
            <div className="drawer lg:drawer-open">
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <PageContent />
                <Sidebar />
            </div>
            <ModalLayout />
        </Fragment>
    );
};

export default Layout;

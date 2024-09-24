import { USER_ROLE } from "@/global/user.types";
import { useAuthStore } from "@/store/authStore";
import PlayerProfile from "./PlayerProfilePage";
import UserProfilePage from "./UserProfilePage";

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    if (!user) return null;

    return user.role == USER_ROLE.PLAYER ? <PlayerProfile /> : <UserProfilePage />;
};

export default ProfilePage;

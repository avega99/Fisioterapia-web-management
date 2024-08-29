export const getPersist = (): boolean => {
    const persist = localStorage.getItem("persist");
    if (!persist) return false;
    const parsedPersist = JSON.parse(persist) as boolean;
    return parsedPersist;
};

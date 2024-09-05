export const getPhotoString = (photo: undefined | null | FileList | string): string | undefined => {
    if (typeof photo == "string" && photo != "") return photo;
    if (typeof photo == "object" && photo && photo[0]) return URL.createObjectURL(photo[0]);
    return undefined;
};

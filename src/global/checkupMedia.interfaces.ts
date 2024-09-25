export type CheckupMediaType = "IMAGE" | "VIDEO" | 'OTHER';

export interface ICheckupMedia {
    id: number;
    url: string;
    asset_name: string;
    type: CheckupMediaType;
    checkupId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IMediaForm {
    files: FileList;
    checkupId: number | string;
}

export type CheckupMediaType = "IMAGE" | "VIDEO";

export interface ICheckupMedia {
    id: number;
    url: string;
    asset_name: string;
    type: CheckupMediaType;
    checkupId: string;
    createdAt: string;
    updatedAt: string;
}

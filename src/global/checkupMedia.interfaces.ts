export type CheckupMediaType = "IMAGE" | "VIDEO";

export interface CheckupMedia {
    id: number;
    url: string;
    asset_name: string;
    type: CheckupMediaType;
    checkupId: string;
    createdAt: string;
    updatedAt: string;
}

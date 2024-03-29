export enum LinkPrecedence {
    primary = "Primary",
    secondary = "Secondary",
}

export interface ICustomer {
    id: number;
    phoneNumber?: number;
    email?: string;
    linkedId: number;
    linkPrecedence: LinkPrecedence;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

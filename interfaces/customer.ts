export enum LinkPrecedenceEnum {
    primary = "primary",
    secondary = "secondary",
}

export interface ICustomer {
    id: number;
    phoneNumber?: number;
    email?: string;
    linkedId: number;
    linkPrecedence: LinkPrecedenceEnum;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ICustomerInsert {
    phoneNumber?: number;
    email?: string;
    linkedId?: number;
    linkPrecedence: LinkPrecedenceEnum;
}

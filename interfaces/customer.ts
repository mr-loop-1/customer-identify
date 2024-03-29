export enum LinkPrecedenceEnum {
    primary = "Primary",
    secondary = "Secondary",
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

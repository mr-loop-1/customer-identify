export enum LinkPrecedenceEnum {
    primary = "primary",
    secondary = "secondary",
}

export interface ICustomer {
    id: number;
    phoneNumber?: string;
    email?: string;
    linkedId: number;
    linkPrecedence: LinkPrecedenceEnum;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ICustomerInsert {
    phoneNumber?: string;
    email?: string;
    linkedId?: number;
    linkPrecedence: LinkPrecedenceEnum;
}

export interface ICustomerFull extends ICustomer {
    secondaryId?: number;
    pairEmail?: string;
    pairPhoneNumber?: string;
}

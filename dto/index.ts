import {
    IsEmail,
    IsPhoneNumber,
    IsOptional,
    IsNumber,
    IsString,
} from "class-validator";

export class PhoneNumberDTO {
    @IsPhoneNumber(undefined, { message: "Invalid phone number" })
    @IsNumber()
    @IsOptional()
    phoneNumber: string;

    @IsEmail(undefined, { message: "Invalid phone number" })
    @IsString()
    @IsOptional()
    email: string;
}

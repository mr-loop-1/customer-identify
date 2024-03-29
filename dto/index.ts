import {
    IsEmail,
    IsPhoneNumber,
    IsOptional,
    IsNumber,
    IsString,
} from "class-validator";
import { Transform } from "class-transformer";

export default class RequestDTO {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => {
        return String(value);
    })
    @IsPhoneNumber("IN", { message: "Invalid phone number" })
    phoneNumber: string;

    @IsEmail(undefined, { message: "Invalid phone number" })
    @IsString()
    @IsOptional()
    email: string;
}

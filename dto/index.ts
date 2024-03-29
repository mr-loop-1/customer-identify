import {
    IsEmail,
    IsPhoneNumber,
    IsOptional,
    IsNumber,
    IsString,
} from "class-validator";
import { Transform, Type } from "class-transformer";

export default class RequestDTO {
    @IsOptional()
    @IsPhoneNumber("IN", { message: "Invalid phone number" })
    @Transform(({ value }) => {
        console.log("Transformed value:", typeof value, typeof String(value));
        return String(value);
    })
    // @IsNumber()
    phoneNumber: string;

    @IsEmail(undefined, { message: "Invalid phone number" })
    @IsString()
    @IsOptional()
    email: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailDTO {
    @ApiProperty({ example: 'example@gmail.com', description: "The email to receive the emial" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "Subject of the email, to be sent",
        example: "OTP verification",
    })
    @IsString()
    @IsNotEmpty()
    subject: string;


    @ApiProperty({
        description: "Message/body of the email, to be sent",
        example: "Hello, note that, the number below is the otp: 2366646",
    })
    @IsString()
    @IsNotEmpty()
    message: string;

}
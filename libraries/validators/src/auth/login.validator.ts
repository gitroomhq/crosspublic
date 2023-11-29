import {IsDefined, IsEmail, IsString, MinLength} from "class-validator";

export class LoginValidator {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  password: string;
}

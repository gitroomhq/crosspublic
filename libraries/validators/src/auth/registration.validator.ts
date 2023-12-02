import {IsDefined, IsEmail, IsOptional, IsString, MinLength} from "class-validator";

export class RegistrationValidator {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  password: string;

  @IsDefined()
  @IsString()
  @MinLength(3)
  company: string;

  @IsOptional()
  @IsString()
  token?: string;
}

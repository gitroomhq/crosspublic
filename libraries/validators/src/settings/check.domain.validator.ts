import {IsDefined, IsString, MinLength} from "class-validator";

export class CheckDomainValidator {
  @IsString()
  @IsDefined()
  @MinLength(3)
  domain: string;
}

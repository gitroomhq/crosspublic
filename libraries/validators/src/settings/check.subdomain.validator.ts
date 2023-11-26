import {IsString, MinLength} from "class-validator";

export class CheckSubdomainValidator {
  @IsString()
  @MinLength(3)
  subDomain: string;
}

import {IsDefined, IsString, MinLength} from "class-validator";

export class CheckSubdomainValidator {
  @IsString()
  @IsDefined()
  @MinLength(3)
  subDomain: string;
}

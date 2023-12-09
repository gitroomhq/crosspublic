import {IsString} from "class-validator";

export class OrganizationCreateValidator {
  @IsString()
  guildId: string;

  @IsString()
  internalId: string;
}

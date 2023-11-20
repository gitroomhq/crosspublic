import {IsBoolean, IsString} from "class-validator";

export class OrganizationCreateValidator {
  @IsString()
  serverName: string;

  @IsString()
  guildId: string;

  @IsBoolean()
  isOwner: boolean;

  @IsString()
  internalId: string;

  @IsString()
  name: string;
}

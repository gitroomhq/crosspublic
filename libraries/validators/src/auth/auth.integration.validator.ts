import { IsDefined, IsIn, IsString } from "class-validator";
import {IntegrationType} from '@prisma/client';

export class AuthIntegrationValidator {
  @IsDefined()
  @IsIn([IntegrationType.DISCORD, IntegrationType.SLACK])
  type: IntegrationType;

  @IsDefined()
  @IsString()
  guild: string;

  @IsDefined()
  @IsString()
  user: string;
}

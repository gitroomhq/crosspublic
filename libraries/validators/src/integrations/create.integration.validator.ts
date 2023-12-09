import {IsDefined, IsIn, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export abstract class Provider {
}

export class Slack extends Provider {
  @IsString()
  @IsDefined()
  code: string;
}

export class Discord extends Provider{
  @IsString()
  @IsDefined()
  code: string;

  @IsString()
  @IsDefined()
  guild_id: string;

  @IsString()
  @IsDefined()
  permissions: string;
}
export class CreateIntegrationValidator {
  @IsIn(['discord', 'slack'])
  type: 'discord' | 'slack';

  @ValidateNested()
  @IsDefined()
  @Type(() => Provider, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: Discord, name: 'discord' },
        { value: Slack, name: 'slack' },
      ],
    },
  })
  information: Discord | Slack;
}

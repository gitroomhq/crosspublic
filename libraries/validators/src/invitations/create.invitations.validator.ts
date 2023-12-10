import {IsDefined, IsIn, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export abstract class Provider {
}

export class Slack extends Provider {
  @IsString()
  @IsDefined()
  internalId: string;

  @IsString()
  @IsDefined()
  guild: string;
}

export class Discord extends Provider{
  @IsString()
  @IsDefined()
  internalId: string;

  @IsString()
  @IsDefined()
  guild: string;
}

export class InvitationsValidator {
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

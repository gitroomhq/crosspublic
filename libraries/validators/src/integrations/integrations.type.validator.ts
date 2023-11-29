import {IsDefined, IsIn} from "class-validator";

export class IntegrationsTypeValidator {
    @IsDefined()
    @IsIn(['slack', 'discord'])
    type: string;
}

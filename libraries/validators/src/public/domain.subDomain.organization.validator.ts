import {IsString, ValidateIf} from "class-validator";

export class DomainSubDomainOrganizationValidator {
    @ValidateIf(o => !o.subdomain)
    @IsString()
    domain: string;

    @ValidateIf(o => !o.domain)
    @IsString()
    subdomain: string;
}

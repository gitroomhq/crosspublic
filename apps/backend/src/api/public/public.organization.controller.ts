import {Controller, Get, Query} from "@nestjs/common";
import {DomainSubDomainOrganizationValidator} from "@meetqa/validators/src/public/domain.subDomain.organization.validator";
import {OrganizationService} from "@meetqa/database/src/organization/organization.service";
import {ApiExcludeEndpoint, ApiTags} from "@nestjs/swagger";

@ApiTags('Public')
@Controller('/public/organization')
export class PublicOrganizationController {
    constructor(
        private _organizationService: OrganizationService,
    ) {
    }
    @Get('/')
    @ApiExcludeEndpoint()
    async organization(
        @Query() query: DomainSubDomainOrganizationValidator
    ) {
        return {apiKey: await this._organizationService.getOrganizationByDomainSubDomain(query)};
    }
}

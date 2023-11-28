import {Controller, Get, Param} from "@nestjs/common";
import {GetOrganizationFromRequest, OrganizationFromRequest} from "@meetfaq/helpers/src/user/organization.from.request";
import slugify from "slugify";
import {FaqService} from "@meetfaq/database/src/faq/faq.service";
import {ApiHeaders, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Public')
@Controller('/public/faq')
@ApiHeaders([{name: 'apikey', required: true}])
export class PublicFaqController {
  constructor(
      private _faqService: FaqService,
  ) {
  }

  @Get('/:slug')
  @ApiOperation({summary: 'Retrieve FAQ', description: "Get FAQ by slug \n\n **[WARNING]**: This endpoint requires the PRO package"})
  async getFaqBySlug(
    @Param('slug') slug: string,
    @GetOrganizationFromRequest() organization: OrganizationFromRequest
  ) {
    const faq = (await this._faqService.getFaqsByOrganizationId(organization.id)).find(faq => slugify(faq.title, {lower: true, strict: true}) === slug);

    return {
      ...faq,
      categories: {
        ...faq.categories.map((category) => ({
          category: {
            ...category.category,
            slug: slugify(category.category.name, {lower: true, strict: true})
          }
        }))
      }
    }
  }
}

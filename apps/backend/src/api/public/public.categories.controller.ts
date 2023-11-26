import {Controller, Get, Param} from "@nestjs/common";
import {GetOrganizationFromRequest, OrganizationFromRequest} from "@meetqa/helpers/src/user/organization.from.request";
import {CategoryService} from "@meetqa/database/src/categories/category.service";
import slugify from "slugify";
import {FaqService} from "@meetqa/database/src/faq/faq.service";
import {ApiHeaders, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Public')
@Controller('/public/categories')
@ApiHeaders([{name: 'apikey', required: true}])
export class PublicCategoriesController {
    constructor(
        private _categoryService: CategoryService,
        private _faqService: FaqService,
    ) {
    }

    @Get('/')
    @ApiOperation({summary: 'Categories List', description: "Get all categories from organization \n\n **[WARNING]**: This endpoint requires the PRO package"})
    async categories(
      @GetOrganizationFromRequest() organization: OrganizationFromRequest
    ) {
      return (await this._categoryService.getCategoriesByOrganizationId(organization.id)).map(category => ({
        ...category,
        slug: slugify(category.name, {lower: true, strict: true})
      }));
    }

  @Get('/:slug/faqs')
  @ApiOperation({summary: 'FAQ list', description: "Get all faqs from category slug \n\n **[WARNING]**: This endpoint requires the PRO package"})
  async allFaqsFromCategories(
    @Param('slug') slug: string,
    @GetOrganizationFromRequest() organization: OrganizationFromRequest
  ) {
    const category = (await this._categoryService.getCategoriesByOrganizationId(organization.id)).find(category => slugify(category.name, {lower: true, strict: true}) === slug);
    const faq = (await this._faqService.getFaqsByCategoryId(organization.id, category.id)).map(category => ({
      ...category,
      slug: slugify(category.title, {lower: true, strict: true})
    }));

    return {faq, category};
  }
}

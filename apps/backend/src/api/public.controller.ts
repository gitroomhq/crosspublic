import {Controller, Get, Param, Post, Query} from "@nestjs/common";
import {DomainSubDomainOrganizationValidator} from "@meetqa/validators/src/public/domain.subDomain.organization.validator";
import {OrganizationService} from "@meetqa/database/src/organization/organization.service";
import {GetOrganizationFromRequest, OrganizationFromRequest} from "@meetqa/helpers/src/user/organization.from.request";
import {CategoryService} from "@meetqa/database/src/categories/category.service";
import slugify from "slugify";
import {FaqService} from "@meetqa/database/src/faq/faq.service";

@Controller('/public')
export class PublicController {
    constructor(
        private _organizationService: OrganizationService,
        private _categoryService: CategoryService,
        private _faqService: FaqService,
    ) {
    }
    @Get('/organization')
    async organization(
        @Query() query: DomainSubDomainOrganizationValidator
    ) {
        return {apiKey: await this._organizationService.getOrganizationByDomainSubDomain(query)};
    }

    @Get('/categories')
    async categories(
      @GetOrganizationFromRequest() organization: OrganizationFromRequest
    ) {
      return (await this._categoryService.getCategoriesByOrganizationId(organization.id)).map(category => ({
        ...category,
        slug: slugify(category.name, {lower: true, strict: true})
      }));
    }

  @Get('/categories/:slug/faqs')
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

  @Get('/faq/:slug')
  async getFaqBySlug(
    @Param('slug') slug: string,
    @GetOrganizationFromRequest() organization: OrganizationFromRequest
  ) {
    return (await this._faqService.getFaqsByOrganizationId(organization.id)).find(faq => slugify(faq.title, {lower: true, strict: true}) === slug);
  }
}

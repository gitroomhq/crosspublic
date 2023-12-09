import {Injectable} from "@nestjs/common";
import {FaqRepository} from "@crosspublic/database/src/faq/faq.repository";
import {CreateFaqValidator} from "@crosspublic/validators/src/faq/create.faq.validator";
import {OrderValidator} from "@crosspublic/validators/src/general/order.validator";
import {AlgoliaService} from "@crosspublic/helpers/src/algolia/algolia.service";
import slugify from "slugify";

@Injectable()
export class FaqService {
  constructor(
    private readonly _faqRepository: FaqRepository,
    private _alogliaService: AlgoliaService<{objectID: string, slug: string, title: string, description: string}>,
  ) {}

  async getFaqById(orgId: string, id: string) {
    return this._faqRepository.getFaqById(orgId, id);
  }

  getFaqsByOrganizationId(orgId: string) {
    return this._faqRepository.getFaqsByOrganizationId(orgId);
  }

  async getFaqsByCategoryId(orgId: string, categoryId: string) {
    return this._faqRepository.getFaqsByCategoryId(orgId, categoryId);
  }

  async deleteFaq(orgId: string, id: string) {
    await this._faqRepository.deleteFaq(orgId, id);
    this._alogliaService.deleteRecord(orgId, id);
  }
  totalFaqByOrganizationId(organizationId: string) {
    return this._faqRepository.totalFaqByOrganizationId(organizationId);
  }
  async createFaq(orgId: string, body: CreateFaqValidator) {
    const create = await this._faqRepository.createFaq(orgId, body.categoryId, body.question, body.answer);
    this._alogliaService.insertRecord(orgId, {
      objectID: create.id,
      title: create.title,
      description: create.content,
      slug: slugify(create.title, {lower: true, strict: true})
    });
    return create;
  }

  async updateFaq(orgId: string, id: string, body: CreateFaqValidator) {
    const update = await this._faqRepository.updateFaq(orgId, id, body.categoryId, body.question, body.answer);
    this._alogliaService.updateRecord(orgId, {
      objectID: update.id,
      title: update.title,
      description: update.content,
      slug: slugify(update.title, {lower: true, strict: true})
    });

    return update;
  }

  changeFaqCategory(orgId: string, id: string, categoryId: string) {
    return this._faqRepository.changeFaqCategory(orgId, id, categoryId);
  }

  updateFaqOrder(
    orgId: string,
    body: OrderValidator
  ) {
    return this._faqRepository.updateFaqOrder(orgId, body);
  }
}

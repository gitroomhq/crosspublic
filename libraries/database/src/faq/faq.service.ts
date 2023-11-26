import {Injectable} from "@nestjs/common";
import {FaqRepository} from "@meetqa/database/src/faq/faq.repository";
import {CreateFaqValidator} from "@meetqa/validators/src/faq/create.faq.validator";
import {OrderValidator} from "@meetqa/validators/src/general/order.validator";

@Injectable()
export class FaqService {
  constructor(
    private readonly _faqRepository: FaqRepository
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
    return this._faqRepository.deleteFaq(orgId, id);
  }
  totalFaqByOrganizationId(organizationId: string) {
    return this._faqRepository.totalFaqByOrganizationId(organizationId);
  }
  createFaq(orgId: string, body: CreateFaqValidator) {
    return this._faqRepository.createFaq(orgId, body.categoryId, body.question, body.answer);
  }

  updateFaq(orgId: string, id: string, body: CreateFaqValidator) {
    return this._faqRepository.updateFaq(orgId, id, body.categoryId, body.question, body.answer);
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

import {Injectable} from "@nestjs/common";
import {FaqRepository} from "@meetqa/database/src/faq/faq.repository";
import {CreateFaq} from "@meetqa/validators/src/faq/create.faq";
import {OrderValidator} from "@meetqa/validators/src/general/order.validator";

@Injectable()
export class FaqService {
  constructor(
    private readonly _faqRepository: FaqRepository
  ) {}

  async getFaqById(orgId: string, id: string) {
    return this._faqRepository.getFaqById(orgId, id);
  }

  async deleteFaq(orgId: string, id: string) {
    return this._faqRepository.deleteFaq(orgId, id);
  }
  totalFaqByOrganizationId(organizationId: string) {
    return this._faqRepository.totalFaqByOrganizationId(organizationId);
  }
  createFaq(orgId: string, body: CreateFaq) {
    return this._faqRepository.createFaq(orgId, body.categoryId, body.question, body.answer);
  }

  updateFaq(orgId: string, id: string, body: CreateFaq) {
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

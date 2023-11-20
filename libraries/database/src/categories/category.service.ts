import {Injectable} from "@nestjs/common";
import {CategoryRepository} from "@meetqa/database/src/categories/category.repository";
import {CreateCategory} from "@meetqa/validators/src/categories/create.category";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";
import {OrderValidator} from "@meetqa/validators/src/general/order.validator";
import {DeleteCategory} from "@meetqa/validators/src/categories/delete.category";

@Injectable()
export class CategoryService {
  constructor(
    private readonly _categoryRepository: CategoryRepository
  ) {}

  updateOrder(organizationId: string, body: OrderValidator) {
    return this._categoryRepository.updateOrder(organizationId, body);
  }

  getCategoriesByOrganizationId(organizationId: string) {
    return this._categoryRepository.getCategoriesByOrganizationId(organizationId);
  }

  getCategoryById(organizationId: string, id: string) {
    return this._categoryRepository.getCategoryById(organizationId, id);
  }

  deleteCategoryById(organizationId: string, id: string, body: DeleteCategory) {
    return this._categoryRepository.deleteCategoryById(organizationId, id, body);
  }

  updateCategoryById(organizationId: string, id: string, body: CreateCategory) {
    return this._categoryRepository.updateCategoryById(organizationId, id, body);
  }

  getCategoriesFaqsByOrganizationId(organizationId: string) {
    return this._categoryRepository.getCategoriesFaqsByOrganizationId(organizationId);
  }

  totalCategoriesByOrganizationId(organizationId: string) {
    return this._categoryRepository.totalCategoriesByOrganizationId(organizationId);
  }

  createCategory(user: UserInterface, body: CreateCategory) {
    return this._categoryRepository.createCategory(user.organization.organizationId, body.name, body.editor);
  }
}

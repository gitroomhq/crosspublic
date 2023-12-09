import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {CategoryService} from "@crosspublic/database/src/categories/category.service";
import {GetUserFromRequest} from "@crosspublic/helpers/src/user/user.from.request";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";
import {CheckPolicies} from "@crosspublic/backend/src/services/authorization/authorization.ability";
import {AuthorizationActions, Sections} from "@crosspublic/backend/src/services/authorization/authorization.service";
import {CreateCategoryValidator} from "@crosspublic/validators/src/categories/create.category.validator";
import {OrderValidator} from "@crosspublic/validators/src/general/order.validator";
import {IdStringValidator} from "@crosspublic/validators/src/general/id.string.validator";
import {DeleteCategoryValidator} from "@crosspublic/validators/src/categories/delete.category.validator";
import {Revalidate} from "@crosspublic/backend/src/services/revalidate";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('/categories')
@ApiHeaders([{name: 'auth', required: true}])
export class CategoriesController {
  constructor(
    private _categoryService: CategoryService
  ) {
  }

  @Revalidate()
  @Post('/order')
  @CheckPolicies([AuthorizationActions.Update, Sections.CATEGORY])
  orderCategories(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: OrderValidator
  ) {
    return this._categoryService.updateOrder(user.organization.organizationId, body);
  }

  @Get('/')
  async getCategories(
      @GetUserFromRequest() user: UserInterface
  ) {
    return this._categoryService.getCategoriesByOrganizationId(user.organization.organizationId);
  }

  @Get('/faq')
  async getFaqs(
    @GetUserFromRequest() user: UserInterface
  ) {
    return this._categoryService.getCategoriesFaqsByOrganizationId(user.organization.organizationId);
  }

  @Revalidate()
  @Post('/')
  @CheckPolicies([AuthorizationActions.Create, Sections.CATEGORY])
  createCategory(
      @Body() body: CreateCategoryValidator,
      @GetUserFromRequest() user: UserInterface
  ) {
    return this._categoryService.createCategory(user, body);
  }

  @Revalidate()
  @Put('/:id')
  @CheckPolicies([AuthorizationActions.Update, Sections.CATEGORY])
  updateCategory(
    @Param() id: IdStringValidator,
    @Body() body: CreateCategoryValidator,
    @GetUserFromRequest() user: UserInterface
  ) {
    return this._categoryService.updateCategoryById(user.organization.organizationId, id.id, body);
  }

  @Revalidate()
  @Delete('/:id')
  @CheckPolicies([AuthorizationActions.Delete, Sections.CATEGORY])
  deleteCategory(
    @Param() id: IdStringValidator,
    @Body() body: DeleteCategoryValidator,
    @GetUserFromRequest() user: UserInterface
  ) {
    return this._categoryService.deleteCategoryById(user.organization.organizationId, id.id, body);
  }

  @Get('/:id')
  async getCategory(
      @GetUserFromRequest() user: UserInterface,
      @Param() id: IdStringValidator
  ) {
    return this._categoryService.getCategoryById(user.organization.organizationId, id.id);
  }
}

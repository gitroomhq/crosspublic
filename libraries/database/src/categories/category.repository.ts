import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {OrderValidator} from "@meetfaq/validators/src/general/order.validator";
import {CreateCategoryValidator} from "@meetfaq/validators/src/categories/create.category.validator";
import {DeleteCategoryValidator} from "@meetfaq/validators/src/categories/delete.category.validator";

@Injectable()
export class CategoryRepository {
  constructor(
    private readonly _prisma: PrismaRepository<'category'>,
    private readonly _faq: PrismaRepository<'faqCategory'>,
  ) {
  }

  async updateOrder(orgId: string, body: OrderValidator) {
    for (const order of body.order) {
      await this._prisma.model.category.update({
        where: {
          id: order.id,
          organizationId: orgId,
        },
        data: {
          order: order.order,
        },
      });
    }
  }

  getCategoryById(organizationId: string, id: string) {
    return this._prisma.model.category.findFirst({
      where: {
        id,
        organizationId,
        deletedAt: null,
      },
    });
  }

  getCategoriesByOrganizationId(organizationId: string) {
    return this._prisma.model.category.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  getCategoriesFaqsByOrganizationId(organizationId: string) {
    return this._prisma.model.category.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        order: true,
        name: true,
        faqs: {
          orderBy: {
            faq: {
              order: 'asc'
            }
          },
          select: {
            faq: {
              select: {
                id: true,
                title: true,
                order: true
              }
            }
          },
          where: {
            faq: {
              deletedAt: null,
            }
          }
        }
      }
    });
  }

  async createCategory(orgId: string, name: string, description: string) {
    const highestOrder = await this._prisma.model.category.findFirst({
      where: {
        organizationId: orgId,
        deletedAt: null,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      }
    });
    return this._prisma.model.category.create({
      data: {
        name,
        description,
        organizationId: orgId,
        order: (highestOrder?.order || 0) + 1
      }
    });
  }

  async deleteCategoryById(orgId: string, id: string, body: DeleteCategoryValidator) {
    const getCategory = await this._prisma.model.category.findUnique({
      where: {
        id,
        organizationId: orgId,
      },
      select: {
        id: true,
        order: true,
        name: true,
        faqs: {
          orderBy: {
            faq: {
              order: 'asc'
            }
          },
          select: {
            faq: {
              select: {
                id: true,
                title: true,
                order: true
              }
            }
          },
          where: {
            faq: {
              deletedAt: null,
            }
          }
        }
      }
    });

    console.log(body);
    if (!getCategory || (getCategory.faqs.length && !body.category)) {
      return;
    }
    else if (body.category) {
      await this._faq.model.faqCategory.updateMany({
        where: {
          categoryId: id,
        },
        data: {
          categoryId: body.category,
        }
      })
    }

    if (body.category) {
      const newCategory = await this._prisma.model.category.findUnique({
        where: {
          id: body.category,
          organizationId: orgId,
        }
      });

      if (!newCategory) {
        return;
      }
    }

    await this._prisma.model.category.update({
      where: {
        id,
        organizationId: orgId,
      },
      data: {
        deletedAt: new Date(),
      }
    });

  }

  async updateCategoryById(orgId: string, id: string, body: CreateCategoryValidator) {
    return this._prisma.model.category.update({
      where: {
        id,
        organizationId: orgId,
      },
      data: {
        name: body.name,
        description: body.editor,
      }
    });
  }

  totalCategoriesByOrganizationId(organizationId: string) {
    return this._prisma.model.category.count({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }
}

import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {OrderValidator} from "@meetqa/validators/src/general/order.validator";

@Injectable()
export class FaqRepository {
  constructor(
    private readonly _prisma: PrismaRepository<'faq'>,
    private readonly _faqCategory: PrismaRepository<'faqCategory'>,
  ) {
  }

  totalFaqByOrganizationId(organizationId: string) {
    return this._prisma.model.faq.count({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  async getFaqById(orgId: string, id: string) {
    return this._prisma.model.faq.findFirst({
      where: {
        id,
        organizationId: orgId,
        deletedAt: null,
      }
    });
  }

  async getFaqsByOrganizationId(orgId: string) {
    return this._prisma.model.faq.findMany({
      where: {
        organizationId: orgId,
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
      include: {
        categories: {
          select: {
            category: true,
          }
        }
      }
    });
  }

  async getFaqsByCategoryId(orgId: string, categoryId: string) {
    return this._prisma.model.faq.findMany({
      where: {
        organizationId: orgId,
        categories: {
          every: {
            category: {
              id: categoryId,
            }
          }
        },
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async deleteFaq(orgId: string, id: string) {
    const getFaq = await this._prisma.model.faq.findFirst({
        where: {
            id,
        },
        select: {
            order: true,
            categories: {
                select: {
                    categoryId: true,
                }
            }
        }
    });

    await this._prisma.model.faq.update({
      where: {
        id,
        organizationId: orgId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    await this._prisma.model.faq.updateMany({
        where: {
            organizationId: orgId,
            categories: {
                every: {
                    category: {
                        id: getFaq?.categories?.[0]?.categoryId
                    }
                }
            },
            order: {
                gt: getFaq?.order || 1,
            }
        },
        data: {
            order: {
                decrement: 1,
            }
        }
    });
  }

  async updateFaq(orgId: string, id: string, categoryId: string, question: string, answer: string) {
    return this._prisma.model.faq.update({
      where: {
        id,
        organizationId: orgId,
      },
      data: {
        title: question,
        content: answer,
      },
    });
  }

  async changeFaqCategory(orgId: string, id: string, categoryId: string) {
    const getFaq = await this._prisma.model.faq.findFirst({
      where: {
        id,
      }, select: {
        order: true,
        categories: {
          select: {
            categoryId: true,
          }
        }
      }
    });

    if (!getFaq) {
      return ;
    }

    await this._prisma.model.faq.updateMany({
      where: {
        organizationId: orgId,
        order: {
          gt: getFaq?.order || 1,
        },
        categories: {
          every: {
            category: {
              id: getFaq?.categories?.[0]?.categoryId
            }
          }
        }
      },
      data: {
        order: {
          decrement: 1,
        }
      }
    });

    const highestOrder = await this._prisma.model.faq.findMany({
      where: {
        organizationId: orgId,
        categories: {
          every: {
            category: {
              id: categoryId,
            }
          }
        }, deletedAt: null,
      },
      orderBy: {
        order: 'desc',
      },
      take: 1,
      select: {
        order: true,
      },
    });

    await this._prisma.model.faq.update({
      where: {
        id,
      },
      data: {
        order: (highestOrder?.[0]?.order || 1) + 1,
      }
    });

    await this._faqCategory.model.faqCategory.updateMany({
      where: {
        categoryId: getFaq?.categories?.[0]?.categoryId,
        faqId: id,
      },
      data: {
        categoryId,
      }
    });
  }

  async createFaq(orgId: string, categoryId: string, question: string, answer: string) {
    const highestOrder = await this._prisma.model.faq.findFirst({
        where: {
            organizationId: orgId,
            categories: {
              every: {
                category: {
                    id: categoryId,
                }
              }
            },
            deletedAt: null,
        },
        orderBy: {
            order: 'desc',
        },
        select: {
            order: true,
        }
    });
    return this._prisma.model.faq.create({
      data: {
        title: question,
        content: answer,
        order: (highestOrder?.order || 0) + 1,
        organizationId: orgId,
        categories: {
          create: [{
            category: {
              connect: {
                id: categoryId,
              }
            }
          }]
        }
      },
    });
  }

  async updateFaqOrder(
    orgId: string,
    body: OrderValidator
  ) {
    for (const order of body.order) {
      await this._prisma.model.faq.update({
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
}

import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {RegistrationValidator} from "@meetfaq/validators/src/auth/registration.validator";
import slugify from "slugify";
import {makeId} from "@meetfaq/helpers/src/makeid/make.id";
import {hashSync} from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    private readonly _prismaUser: PrismaRepository<'user'>,
    private readonly _integrationsUsers: PrismaRepository<'integrationsUsers'>,
  ) {
  }

  totalUsersByOrganizationId(orgId: string) {
    return this._prismaUser.model.user.count({
      where: {
        organization: {
          every: {
            organizationId: orgId
          }
        }
      }
    });
  }

  async getUserByEmail(email: string) {
    return this._prismaUser.model.user.findFirst({
      where: {
        email
      },
      include: {
        organization: true
      }
    });
  }

  async register(body: RegistrationValidator, guildId?: string, internalId?: string, organizationId?: string) {
    const createOrg = await this._prismaUser.model.user.create({
      data: {
        email: body.email.toLowerCase(),
        name: body.company,
        password: hashSync(body.password, 16),
        internalId: makeId(20),
        organization: guildId && organizationId ? {
          create: {
            role: 'USER',
            organization: {
              connect: {
                id: organizationId
              }
            }
          }
        } : {
          create: {
            role: 'ADMIN',
            organization: {
              create: {
                name: body.company,
                guildId:  makeId(10),
                subDomain: (slugify(body.company, {
                  lower: true,
                  strict: true,
                  trim: true
                }) + '-' + makeId(3)).toLowerCase()
              }
            }
          }
        }
      },
      include: {
        organization: {
          include: {
            organization: true
          }
        }
      }
    });

    if (guildId && internalId && organizationId) {
      await this._integrationsUsers.model.integrationsUsers.create({
        data: {
          integration: {
            connect: {
              internalId_organizationId: {
                internalId: guildId,
                organizationId: organizationId
              }
            }
          },
          owner: false,
          internalId,
        }
      })
    }

    return createOrg;
  }
}

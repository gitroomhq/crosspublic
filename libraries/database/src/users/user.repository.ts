import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetqa/validators/src/organizations/organization.create.validator";

@Injectable()
export class UserRepository {
  constructor(
    private readonly _prismaUser: PrismaRepository<'user'>
  ) {
  }

  async getOrCreateUser(orgId: string, body: OrganizationCreateValidator) {
    const create = await this._prismaUser.model.user.findFirst({
      where: {
        internalId: body.internalId
      },
      include: {
        organization: true
      }
    });

    if (create && !create.organization.some(l => l.organizationId === orgId) && body.isOwner) {
      await this._prismaUser.model.user.update({
        where: {
          id: create.id
        },
        data: {
          organization: {
            create: [
              {
                organizationId: orgId,
                role: 'ADMIN'
              }
            ]
          }
        }
      });
    }

    const load = await this._prismaUser.model.user.findFirst({
      where: {
        internalId: body.internalId
      },
      include: {
        organization: true
      }
    }) || ((body.isOwner) ? await this._prismaUser.model.user.create(
      {
        data: {
          internalId: body.internalId,
          name: body.name,
          organization: {
            create: [
              {
                organizationId: orgId,
                role: 'ADMIN',
              }
            ]
          }
        },
        include: {
          organization: true
        }
      }
    ) : false);

    if (!load) {
      return false;
    }

    const organization = load.organization.find(l => l.organizationId === orgId) || false;
    if (!organization) {
      return false;
    }

    return {
      ...load,
      organization
    }
  }
}

import {Injectable} from "@nestjs/common";
import algoliasearch from 'algoliasearch';

// Connect and authenticate with your Algolia app
const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!, process.env.ALGOLIA_ADMIN_API_KEY!);

@Injectable()
export class AlgoliaService<T extends {objectID: string}> {
  async insertRecord(orgId: string, object: T) {
    return client.initIndex(orgId).saveObject(object).wait();
  }

  async deleteRecord(orgId: string, objectId: string) {
    return client.initIndex(orgId).deleteObject(objectId).wait();
  }

  async updateRecord(orgId: string, object: T) {
    return client.initIndex(orgId).partialUpdateObject(object, {
      createIfNotExists: true
    }).wait();
  }
}

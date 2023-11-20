export interface UserInterface {
  id: string,
  name: string,
  internalId: string,
  organization:  {
    userId: string,
    organizationId: string
  }
}

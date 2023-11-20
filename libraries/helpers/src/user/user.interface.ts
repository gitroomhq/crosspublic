export interface UserInterface {
  id: string,
  name: string,
  email: string,
  internalId: string,
  organization:  {
    userId: string,
    organizationId: string,
    role: 'ADMIN' | 'USER'
  }
}

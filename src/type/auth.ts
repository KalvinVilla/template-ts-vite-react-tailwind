export const enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Unauthenticated = 2,
}

export interface Account {
  permissions: string[];
}

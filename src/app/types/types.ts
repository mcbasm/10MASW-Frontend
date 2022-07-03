//#region OBJECT TYPES
//#region Pagination
export type Pagination = {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
};

export type PaginationResult<T> = {
  items: T[];
  pagination: Pagination;
};
//#endregion Pagination

//#region Seguridad
export type TokenResponse = {
  token: string;
};
export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

//#endregion Seguridad

//#region Schemas
export type Role = {
  _id: string;
  name: string;
};

export type User = {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
};
//#endregion Schemas
//#endregion OBJECT TYPES

//#region VALUE TYPES
export type ErrorMessage =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'format'
  | 'equal'
  | 'custom'
  | 'email';
//#endregion VALUE TYPES

//#region OBJECT TYPES
//#region Pagination
export type Pagination = {
  limit: number;
  page: number;
  totalItems: number;
  totalPages: number;
  filter: any;
};

export type PaginationResult<T> = {
  items: T[];
  pagination: Pagination;
};
//#endregion Pagination

//#region Schemas
export type Product = {
  _id?: string;
  measurementUnit: MeasurementUnits;
  minimumStock: number;
  name: string;
  status: boolean;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Role = {
  _id: string;
  name: string;
  nameES: string;
};

export type User = {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  status?: boolean;
};
//#endregion Schemas

//#region Seguridad
export type TokenResponse = {
  role: Role;
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
//#endregion OBJECT TYPES

//#region VALUE TYPES
export type ErrorMessage =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | 'format'
  | 'equal'
  | 'custom'
  | 'email';

export type MeasurementUnits = 'kg' | 'gr' | 'lt' | 'pkg';
//#endregion VALUE TYPES

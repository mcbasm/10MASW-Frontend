//#region OBJECT TYPES
//#region Pagination
export type Pagination = {
  filter: any;
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

//#region Schemas
export type Invoice = {
  _id?: string;
  billNumber: string;
  buyDate: Date | string;
  currency: Currency;
  deliveryDate: Date | string;
  products: ProductPicked[];
  provider: string;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * status: 1 - Pendiente, 2 - En preparación, 3 - Atendida, 4 - Completada, 5 - Cancelada
 */
export type Order = {
  _id?: string;
  table: Table;
  recipes: RecipePicked[];
  status?: number;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

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

export type ProductPicked = {
  _id?: string;
  product: Product;
  quantity: number;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Recipe = {
  _id?: string;
  currency: string;
  name: string;
  products: ProductPicked[];
  status?: boolean;
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type RecipePicked = {
  _id?: string;
  recipe: Recipe;
  quantity: number;
};

export type Role = {
  _id?: string;
  name: string;
  nameES: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * availability: 1 - Libre, 2 - Reservado, 3 - Ocupado
 */
export type Table = {
  _id?: number;
  availability: number;
  number: number;
  reserveHour?: string;
  status?: boolean;
  waiter?: User;
};

export type User = {
  _id?: string;
  email: string;
  lastName: string;
  name: string;
  password: string;
  phone: string;
  role: Role;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
  exp: number;
  iat: number;
  name: string;
}
//#endregion Seguridad
//#endregion OBJECT TYPES

//#region VALUE TYPES
export type Currency = 'S/.' | '$' | '€';

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

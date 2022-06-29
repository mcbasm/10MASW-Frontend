//#region Object Types
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
//#endregion Object Types

//#region Value Types
export type ErrorMessage =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'format'
  | 'equal'
  | 'custom'
  | 'email';
//#endregion Value Types

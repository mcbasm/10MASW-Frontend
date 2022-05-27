export type Pagination = {
  rows: number;
  total: number;
  pages: number;
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

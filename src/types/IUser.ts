export interface IRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUSerWithoutPassword {
  id?: string;
  name: string;
  email?: string;
  password?: string;
  createdOn?: Date;
  updatedOn?: Date;
}

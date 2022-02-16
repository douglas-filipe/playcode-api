export interface ICreateUsers {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUsers {
  email: string;
  password: string;
}


export interface IerrorsYup {
  errors: [string];
}

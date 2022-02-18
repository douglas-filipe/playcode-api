export interface ICreateUsers {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUsers {
  email: string;
  password: string;
}

export interface ICreateComments {
  description: string;
}

export interface IerrorsYup {
  errors: [string];
}

export interface IcreateComments {
  description: string;
  video: string;
}

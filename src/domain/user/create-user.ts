export interface ICreateUser {
  fullName: string;
  emailAddress: string;
  phoneNumber?: string;
  description?: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: string[];
}

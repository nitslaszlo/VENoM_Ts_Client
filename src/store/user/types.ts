export interface User {
  email: string;
  userId: any;
  first: string;
  last: string;
}

export interface UserState {
  user?: User;
  isLoggedIn: boolean;
  error: boolean;
  errorMsg: string;
}

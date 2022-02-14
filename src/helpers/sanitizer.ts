import { User } from '../models/user.model';

const hidePassword = (
  user: User
): { password: string; name: string; id: Number; email: string } => {
  return {
    ...user,
    password: '*******',
  };
};

export { hidePassword };

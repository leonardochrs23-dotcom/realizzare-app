import { MockUser } from '../constants/MockData';

export const useAuth = () => ({
  signIn: async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 1000)); // simulate API
    return { success: true, user: MockUser };
  },
  signUp: async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));
    return { success: true };
  },
  signOut: () => {},
});

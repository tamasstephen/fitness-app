export interface AuthStore {
  user_id: string;
  setUser: (user_id: string) => void;
  clearUser: () => void;
  getUserId: () => string;
}

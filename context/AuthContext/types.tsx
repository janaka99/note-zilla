type Action = {
  type: string;
  payload?: any;
};

type User = {
  email: string;
  username: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<Action>;
};

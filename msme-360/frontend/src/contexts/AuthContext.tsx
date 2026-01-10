import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserType {
  email: string;
  // keep compatibility with supabase-style user object used elsewhere
  user_metadata?: {
    full_name?: string;
  };
}

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded "database" for testing
const usersDB: { [email: string]: { password: string; fullName: string } } = {};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage if user is already "logged in"
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    if (usersDB[email]) {
      return { error: new Error('User already exists') };
    }
    // Save in "DB"
    usersDB[email] = { password, fullName };
    const newUser: UserType = { email, user_metadata: { full_name: fullName } };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const record = usersDB[email];
    if (!record || record.password !== password) {
      return { error: new Error('Invalid login credentials') };
    }
    const loggedInUser: UserType = { email, user_metadata: { full_name: record.fullName } };
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    return { error: null };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

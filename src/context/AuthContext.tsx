import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mocked session
    const storedUser = localStorage.getItem('dairy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Mock API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        if (email === 'test@example.com' && pass === 'password') {
          const mockUser = { id: '1', name: 'Test User', email, token: 'mock-jwt-token' };
          setUser(mockUser);
          localStorage.setItem('dairy_user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials. Use test@example.com / password.'));
        }
      }, 800);
    });
  };

  const signup = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    // Mock API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        const mockUser = { id: Date.now().toString(), name, email, token: 'mock-jwt-token-new' };
        setUser(mockUser);
        localStorage.setItem('dairy_user', JSON.stringify(mockUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dairy_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  customerCode: string | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
  setCustomerCode: (customerCode: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  customerCode: null,
  setToken: () => {},
  setUserId: () => {},
  setCustomerCode: () => {},
  isAuthenticated: false,
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [customerCode, setCustomerCode] = useState<string | null>(null);
 
  function logout() {
    setToken(null);
    setUserId(null);
    setCustomerCode(null);
  }

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        userId,
        customerCode,
        setToken,
        setUserId,
        setCustomerCode,
        isAuthenticated: !!token,
        logout 
      }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

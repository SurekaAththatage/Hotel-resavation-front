import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export type UserRole = 'user' | 'clerk' | 'admin' | 'USER' | 'CLERK' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
 register: (name: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// ⬇️ Read base URL from env or fall back to local Spring‑Boot default
const API_BASE =
  (import.meta as any).env?.VITE_API_BASE ?? "http://localhost:8080";

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* --------------------------------------------------------------------- */
  /*   Load the cached user (if any) once on mount                         */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (_) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  /* --------------------------------------------------------------------- */
  /*   Login — POST /api/users/login                                       */
  /* --------------------------------------------------------------------- */
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/users/login`, {
        email,
        password,
      });

      // Back‑end fields: id, name, email, role (UPPER‑CASE)
      const mappedUser: User = {
        id: String(data.id),
        name: data.name,
        email: data.email,
        role: (data.role || "user").toLowerCase() as UserRole,
      };

      setUser(mappedUser);
      localStorage.setItem("user", JSON.stringify(mappedUser));
    } catch (err: any) {
      const message = err.response?.data ?? "Login failed. Please try again.";
      console.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------------------------------------------- */
  /*   Register — POST /api/users/register                                 */
  /* --------------------------------------------------------------------- */
  

const register = async (name: string, username: string, email: string, password: string) => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user',
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  } catch (error) {
    console.error('Registration failed', error);
    throw new Error('Registration failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  /* --------------------------------------------------------------------- */
  /*   Logout                                                              */
  /* --------------------------------------------------------------------- */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: UserContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/* ------------------------------------------------------------------------- */
/*   Convenience hook                                                        */
/* ------------------------------------------------------------------------- */
export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
};
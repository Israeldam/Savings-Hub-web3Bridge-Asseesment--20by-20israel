import React, { createContext, useContext, useState, useEffect } from "react";
import { Student } from "@shared/savings";

interface AuthUser {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (username: string, email: string, password: string, tierId: number) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    // Create demo account if no users exist
    const allUsersStr = localStorage.getItem("auth_users") || "[]";
    const allUsers = JSON.parse(allUsersStr);

    if (allUsers.length === 0) {
      const demoUser = {
        id: "demo-user-001",
        username: "Demo User",
        email: "demo@example.com",
        password: "demo123",
        tierId: 2,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("auth_users", JSON.stringify([demoUser]));
    }

    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    // Get all users from localStorage
    const allUsersStr = localStorage.getItem("auth_users") || "[]";
    const allUsers = JSON.parse(allUsersStr);

    // Find user with matching email and password
    const foundUser = allUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: "Invalid email or password" };
    }

    // Create auth user object (without password)
    const authUser: AuthUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };

    setUser(authUser);
    localStorage.setItem("auth_user", JSON.stringify(authUser));

    return { success: true };
  };

  const signup = (
    username: string,
    email: string,
    password: string,
    tierId: number
  ): { success: boolean; error?: string } => {
    if (!username || !email || !password) {
      return { success: false, error: "All fields are required" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    // Get all users from localStorage
    const allUsersStr = localStorage.getItem("auth_users") || "[]";
    const allUsers = JSON.parse(allUsersStr);

    // Check if email already exists
    if (allUsers.some((u: any) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password, // In production, this would be hashed
      tierId,
      createdAt: new Date().toISOString(),
    };

    // Save to users list
    allUsers.push(newUser);
    localStorage.setItem("auth_users", JSON.stringify(allUsers));

    // Auto-login after signup
    const authUser: AuthUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    setUser(authUser);
    localStorage.setItem("auth_user", JSON.stringify(authUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, AuthContextType, RegisterData, UserRole } from "@/types";
import { DEMO_USERS } from "@/data/mockData";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("venturiq_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("venturiq_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    // Check demo users
    const demoUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (demoUser) {
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      localStorage.setItem("venturiq_user", JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }

    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem("venturiq_registered_users") || "[]");
    const regUser = registeredUsers.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password
    );

    if (regUser) {
      const { password: _, ...userWithoutPassword } = regUser;
      setUser(userWithoutPassword);
      localStorage.setItem("venturiq_user", JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const registeredUsers = JSON.parse(localStorage.getItem("venturiq_registered_users") || "[]");
    const exists = registeredUsers.find((u: { email: string }) => u.email === data.email);

    if (exists) {
      setLoading(false);
      return false;
    }

    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      role: data.role as UserRole,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=F97316&color=fff&size=100`,
      bio: "",
      company: "",
      location: "",
      createdAt: new Date().toISOString().split("T")[0],
      password: data.password,
    };

    registeredUsers.push(newUser);
    localStorage.setItem("venturiq_registered_users", JSON.stringify(registeredUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("venturiq_user", JSON.stringify(userWithoutPassword));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("venturiq_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'recruiter') => Promise<void>;
  logout: () => void;
}

// Mock user data for development
const mockUsers = [
  {
    id: "s1",
    name: "John Student",
    email: "student@example.com",
    role: "student" as const,
    university: "MIT",
    degree: "Computer Science",
    graduationYear: 2024,
    skills: ["React", "JavaScript", "Java"],
    about: "Passionate student looking for internships in software development."
  },
  {
    id: "r1",
    name: "Jane Recruiter",
    email: "recruiter@example.com",
    role: "recruiter" as const,
    company: "Tech Solutions Inc.",
    position: "HR Manager",
    about: "Hiring manager for software engineering positions."
  },
  {
    id: "a1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin" as const
  }
];

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser && password === "password") { // Simple mock authentication
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        toast.error("Invalid email or password");
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'recruiter') => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error("Email already registered");
        throw new Error("Email already registered");
      }
      
      // Create new user
      const newUser = {
        id: `${role[0]}${mockUsers.length + 1}`,
        name,
        email,
        role,
        ...(role === 'student' ? {
          university: "",
          degree: "",
          graduationYear: new Date().getFullYear() + 4,
          skills: [],
        } : {
          company: "",
          position: "",
        })
      };
      
      // In a real app, we would save this to the backend
      mockUsers.push(newUser as any);
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

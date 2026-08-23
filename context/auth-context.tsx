"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useRouter } from "next/navigation";

export type UserRole = "student" | "employer" | "university" | "mentor" | "admin" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function determineRole(email: string, metadata?: Record<string, unknown>): UserRole {
  const metadataRole = metadata?.role;
  if (
    metadataRole === "student" ||
    metadataRole === "employer" ||
    metadataRole === "university" ||
    metadataRole === "mentor" ||
    metadataRole === "admin"
  ) {
    return metadataRole;
  }

  if (email.includes("@university.")) return "university";
  if (email.includes("@employer.")) return "employer";
  if (email.includes("@mentor.")) return "mentor";
  return "student";
}

function mapUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): User {
  const email = supabaseUser.email ?? "";
  return {
    id: supabaseUser.id,
    email,
    name: String(supabaseUser.user_metadata?.name ?? email.split("@")[0] ?? "Пользователь"),
    role: determineRole(email, supabaseUser.user_metadata),
    avatar: typeof supabaseUser.user_metadata?.avatar_url === "string"
      ? supabaseUser.user_metadata.avatar_url
      : undefined,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user ? mapUser(data.user) : null);
        setIsLoading(false);
      }
    }).catch(() => {
      if (mounted) {
        setUser(null);
        setIsLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ? mapUser(session.user) : null);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not configured");
    }

    const { data, error } = await getSupabaseBrowserClient().auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (data.user) {
      const nextUser = mapUser(data.user);
      setUser(nextUser);
      router.push(`/${nextUser.role ?? "student"}/dashboard`);
    }
  };

  const register = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase is not configured");
    }

    const redirectTo = `${window.location.origin}/auth/callback`;
    const { data, error } = await getSupabaseBrowserClient().auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) throw error;
    if (data.session && data.user) {
      const nextUser = mapUser(data.user);
      setUser(nextUser);
      router.push(`/${nextUser.role ?? "student"}/dashboard`);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      const { error } = await getSupabaseBrowserClient().auth.signOut();
      if (error) throw error;
    }
    setUser(null);
    router.push("/login");
  };

  const switchRole = (role: UserRole) => {
    setUser((current) => current ? { ...current, role } : current);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

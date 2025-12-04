"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../AuthProvider.jsx";

export default function AdminRoute({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      router.replace("/403");
    }
  }, [user, router]);

  // optionally return null while redirecting
  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return children;
}

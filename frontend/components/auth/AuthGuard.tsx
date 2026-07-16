"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (getToken()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- imperative auth check on mount, must run once per navigation
      setAuthorized(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}

import { useAuthContext } from "@context/Authentication";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { Loader } from "@components/shared/elements/Loader";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/accounts/login/assessor");
    }
  }, [router, isLoading, user]);

  if (!isLoading && user) {
    return <>{children}</>;
  }

  return (
    <div className="loader-parent">
      <Loader />
    </div>
  );
};

export default ProtectedRoute;

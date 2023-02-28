import DashboardPage from "components/dashboard";
import EmployeesPage from "components/employees";
import UploadPage from "components/upload";
import MainLayout from "layout";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

export default function UpaxPage() {
  const router = useRouter();

  const pageCurrent = useMemo(() => {
    return router.asPath.split("#")[1] ?? "";
  }, [router.asPath]);

  useEffect(() => {
    if (
      router &&
      pageCurrent &&
      !["employees", "upload", "dashboard"].includes(pageCurrent)
    ) {
      router.push({
        pathname: "/upax",
        hash: "employees",
      });
    }
  }, [pageCurrent, router]);

  return (
    <MainLayout>
      {(function () {
        switch (pageCurrent) {
          case "employees":
            return <EmployeesPage />;
          case "upload":
            return <UploadPage />;
          case "dashboard":
            return <DashboardPage />;
          default:
            return null;
        }
      })()}
    </MainLayout>
  );
}

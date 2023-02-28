import { useRouter } from "next/router";
import { useEffect } from "react";

const Page404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push({
      pathname: "/upax",
      hash: "employees",
    });
  }, [router]);
  return null;
};

export default Page404;

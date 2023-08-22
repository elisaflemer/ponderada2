"use client";

import Tasks from "@/components/Tasks";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isUserAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    console.log(isUserAuthenticated())
    !isUserAuthenticated() && router.push("/");
  }, []);

  return (
    <div className="bg-lightpurple w-full h-screen justify-center items-center flex">
      <Tasks />
    </div>
  );
}

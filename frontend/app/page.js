"use client";

import Login from "@/components/Login";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";

export default function Home() {
  const { isUserAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    console.log(isUserAuthenticated())
    // checks if the user is authenticated
    isUserAuthenticated() ? router.push("/tasks") : router.push("/");
  }, []);

  return (
    <div className="bg-lightpurple w-full h-screen justify-center items-center flex">
      <Login />
    </div>
  );
}

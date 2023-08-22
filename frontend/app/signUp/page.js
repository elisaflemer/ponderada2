"use client";

import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import NewUser from "@/components/NewUser";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-lightpurple w-full h-screen justify-center items-center flex">
      <NewUser />
    </div>
  );
}

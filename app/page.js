"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useEffect } from "react";
// import Image from "next/image";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  const CheckingUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName,
    });
  };

  useEffect(() => {
    user && CheckingUser();
  }, [user, createUser]);

  return (
    <div>
      <div className="flex justify-end p-5 shadow-sm">
        {user ? (
          <UserButton />
        ) : (
          <div className="flex gap-2">
            <Link href={"/sign-in"}>
              <Button className="cursor-pointer">Sign In</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="cursor-pointer">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
      <div className="vk h-full w-full"></div>
      <div className="ml-auto mr-auto pt-5 w-max">
        <Link href={"/dashboard"}>
          <Button className="cursor-pointer">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

"use client";

import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
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
  }, [user,createUser]);

  return (
    <div>
      <UserButton />
    </div>
  );
}

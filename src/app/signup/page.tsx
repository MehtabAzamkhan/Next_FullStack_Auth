"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/moving-border";

import { motion } from "framer-motion";

import { AuroraBackground } from "@/components/ui/aurora-background";

import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <AuroraBackground>
      <div className="flex items-center justify-center min-h-screen">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-10 bg-white dark:bg-zinc-900">
          <div className="flex flex-col items-center justify-center py-2 text-white font-bold">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />

            <label htmlFor="username">Username</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
            />
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
            <label htmlFor="password">Password</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black w-full"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />

            <Button
              onClick={onSignup}
              borderRadius="2rem"
              className="bg-white dark:bg-slate-800 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              {buttonDisabled ? "No signup" : "Signup"}
            </Button>

            <Link href="/login">Visit login page</Link>
          </div>
        </BackgroundGradient>
      </div>
    </AuroraBackground>
  );
}

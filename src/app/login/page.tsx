"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/moving-border";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="flex items-center justify-center min-h-screen">
          <BackgroundGradient className="rounded-[22px] w-full sm:max-w-sm p-10 bg-white dark:bg-zinc-900">
            <div className="flex flex-col items-center justify-center py-2 text-white font-bold">
              <h1>{loading ? "Processing" : "Login"}</h1>
              <hr />

              <label htmlFor="email" className="text-white">
                Email
              </label>
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
                onClick={onLogin}
                borderRadius="2rem"
                className="bg-white dark:bg-slate-800 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                Login here
              </Button>

              <Link href="/signup">Create New Account</Link>
            </div>
          </BackgroundGradient>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const Login: React.FC = () => {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    if (res.status === 200) {
      router.push("/admin");
    } else alert("Incorrect username or password");
  };

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center gap-6 relative">
      <h1 className="text-5xl font-bold text-white absolute top-8 left-1/2 -translate-x-1/2">
        Admin
      </h1>
      <input
        ref={usernameRef}
        className="w-1/2 py-2 px-3 rounded-full bg-white text-black"
        placeholder="Username"
      ></input>
      <input
        ref={passwordRef}
        type="password"
        className="w-1/2 py-2 px-3 rounded-full bg-white text-black"
        placeholder="Password"
      ></input>
      <button
        className="w-1/3 py-2 px-3 mt-4 rounded-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </button>
    </section>
  );
};

export default Login;

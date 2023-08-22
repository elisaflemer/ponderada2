"use client";

import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserAuthInfo } = useContext(AuthContext);
  const router = useRouter();
  const [credentialsAreIncorrect, setCredentialsAreIncorrect] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform login API call or authentication logic
    // Example API call using fetch:
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUserAuthInfo(data); // Set user's authentication data in context
      router.push("/tasks");
    } else {
      setCredentialsAreIncorrect(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-80 relative">
      <div className="flex flex-col items-center justify-center gap-5 w-80 relative">
        <div className="bg-lila w-full shadow-md py-2 px-6 text-center text-white font-semibold">
          Login
        </div>
        <div className="bg-white flex flex-col pt-8 pb-12 px-10 gap-10 w-full shadow-md text-sm">
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Email"
              className="focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {credentialsAreIncorrect && (
              <p className="text-red-800">The email or password is incorrect</p>
            )}
          </form>
        </div>
        <button
          className="bg-lila absolute -bottom-5 py-3 px-6 rounded-full text-white font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div>
        <a href="/signUp" className="text-black mt-5">
          Criar conta
        </a>
      </div>
    </div>
  );
};

export default Login;

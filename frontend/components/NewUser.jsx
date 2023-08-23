import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const NewUser = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Perform user registration API call
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setAuthState({token: null})
      router.push("/"); 
    } else {
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-80 relative">
      <div className="flex flex-col items-center justify-center gap-5 w-80 relative">
        <div className="bg-lila w-full shadow-md py-2 px-6 text-center text-white font-semibold">
          Criar conta
        </div>
        <div className="bg-white flex flex-col pt-8 pb-12 px-10 gap-8 w-full shadow-md text-sm">
          <form>
            <input
              type="text"
              placeholder="Email"
              className="focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <button
          className="bg-lila absolute -bottom-5 py-3 px-6 rounded-full text-white font-semibold"
          onClick={handleCreateUser}
        >
          Criar
        </button>
      </div>
    </div>
  );
};

export default NewUser;

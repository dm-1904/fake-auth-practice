import { useState } from "react";
import toast from "react-hot-toast";
import { Requests } from "../api";
// import { UserType } from "../types";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      Requests.postData("app-users", { username, password }).then(
        (user) => localStorage.setItem("user", JSON.stringify(user))
        //adding to local storage and logout button in Auth.Provider
      );
      toast.success("Registered successfully");
      setUsername("");
      setPassword("");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="sign-up-box">
        <input
          type="text"
          placeholder="User Name"
          className="user-name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="create-account"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

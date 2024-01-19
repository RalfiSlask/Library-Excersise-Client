import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";

function App() {
  const navigate = useNavigate();
  // userInput, använd en state istället för localStorage
  const [user, setUser] = useState({ userName: "", password: "" });

  const handleInput = (
    e: FormEvent<HTMLInputElement>,
    property: keyof typeof user
  ) => {
    setUser((prev) => ({
      ...prev,
      [property]: (e.target as HTMLInputElement).value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const jsonData = await response.json();
      if (jsonData.user) {
        localStorage.setItem("user", JSON.stringify(jsonData.user));
        if (jsonData.redirect) {
          navigate(jsonData.redirect);
          setUser({ userName: "", password: "" });
        }
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-3xl my-10">Login Form Test</h1>
      <form
        id="loginForm"
        className="flex flex-col gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <NameInput handleInput={handleInput} userName={user.userName} />
        <PasswordInput handleInput={handleInput} password={user.password} />
        <button
          type="submit"
          className="hover:bg-gray-400 bg-gray-300 w-32 py-1 flex items-center justify-center rounded-full"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default App;

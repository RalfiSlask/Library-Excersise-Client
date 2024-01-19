import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoggedIn = () => {
  const localStoredUser = localStorage.getItem("user");

  const [storedUser, setStoredUser] = useState(
    localStoredUser ? JSON.parse(localStoredUser) : null
  );

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="my-20 flex flex-col items-center gap-6">
        <h1>Logged in as {storedUser.username}</h1>
        <button
          onClick={handleClick}
          className="hover:bg-gray-400 bg-gray-300 w-32 py-1 flex items-center justify-center rounded-full"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default LoggedIn;

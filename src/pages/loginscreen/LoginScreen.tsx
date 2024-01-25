import { FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

const LoginScreen = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const {
    loginInfo,
    isRememberMeChecked,
    setLoginInfo,
    setLoggedInUser,
    setErrorMessage,
    handleLoginReset,
    handleClickOnRemenberMe,
  } = loginContext;

  const navigate = useNavigate();

  const postLoginInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData.email) {
          localStorage.setItem('user', JSON.stringify({ id: jsonData.id, email: jsonData.email }));
          setLoggedInUser({ id: jsonData.id, email: jsonData.email });
          navigate('/library', { state: { email: jsonData.email } });
          setLoginInfo({ email: '', password: '' });
        } else {
          setErrorMessage('User does not exist');
        }
      }
    } catch (err) {
      console.log(err, 'error');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postLoginInfo();
  };

  const handleClickCreateAccount = () => {
    navigate('/account');
  };

  return (
    <div className="flex flex-col gap-10 mt-[200px]">
      <h1 className="text-[#525252] text-[2.25rem] font-bold">Login to your Account</h1>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
        id="formInput"
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div
              onClick={handleClickOnRemenberMe}
              className="bg-[#7F265B] w-6 h-full rounded-sm flex justify-center items-center cursor-pointer hover:bg-[#d69cc0]"
            >
              {isRememberMeChecked && (
                <img src="./src/assets/checkmark.svg" width="20px" height="20px" alt="checkmark icon" />
              )}
            </div>
            <p className="text-[#A1A1A1]">Remember Me</p>
          </div>
          <p className="text-[#7F265B] cursor-pointer">Forgot Password?</p>
        </div>
        <div className="flex justify-center gap-4">
          <button className="bg-[#7F265B] text-white rounded-md px-8 py-2" type="submit">
            Login
          </button>
          <button onClick={handleLoginReset} className="bg-[#7F265B] text-white rounded-md px-8 py-2" type="reset">
            Reset
          </button>
        </div>
      </form>
      <div className="flex items-center gap-4">
        <p className="text-[1.5rem] text-[#828282]">Not Registered Yet?</p>
        <p
          onClick={handleClickCreateAccount}
          className="text-[1.5rem] text-[#7F265B] hover:text-[#d69cc0] cursor-pointer"
        >
          Create an account
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;

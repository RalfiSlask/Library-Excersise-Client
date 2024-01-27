import { FormEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import EmailInputContainer from './EmailInputContainer';
import PasswordInputContainer from './PasswordInputContainer';

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
        console.log(jsonData);
        if (jsonData.email) {
          localStorage.setItem('user', JSON.stringify({ id: jsonData.id, email: jsonData.email }));
          setLoggedInUser({ id: jsonData.id, email: jsonData.email });
          navigate('/library');
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
    if (loginInfo.email.trim().length <= 0 || loginInfo.password.trim().length <= 0) {
      alert('You have to fill in inputs');
    } else {
      await postLoginInfo();
    }
  };

  const handleClickCreateAccount = () => {
    setLoginInfo({ email: '', password: '' });
    setErrorMessage('');
    navigate('/account');
  };

  return (
    <div className="flex flex-col gap-10 items-center mt-[200px] w-[600px]">
      <h1 className="text-[#525252] text-[2.25rem] font-bold">Login to your Account</h1>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
        id="formInput"
        className="flex flex-col gap-4 w-[400px]"
      >
        <EmailInputContainer />
        <PasswordInputContainer />
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

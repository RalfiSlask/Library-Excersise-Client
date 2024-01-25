import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleReset = () => {
    setUserInfo({ email: '', password: '' });
    setErrorMessage('');
  };

  const postUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/login/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        navigate('/');
      } else {
        console.log('mumma');
      }
    } catch (err) {
      console.log(err, 'failed to fetch data');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postUserInfo();
    setUserInfo({ email: '', password: '' });
  };

  const handleEmailInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUserInfo(prev => ({ ...prev, email: target.value }));
  };

  const handlePasswordInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUserInfo(prev => ({ ...prev, password: target.value }));
  };

  return (
    <div className="flex flex-col gap-10 mt-[200px]">
      <h1 className="text-[#525252] text-[2.25rem] font-bold">Create Account</h1>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
        id="formInput"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="emailInput">Email</label>
            <p className="text-red-500"></p>
          </div>

          <input
            onInput={e => {
              handleEmailInput(e);
            }}
            className="rounded-md pl-2 py-2 border-2 border-solid border-[#DED2D9]"
            placeholder="Email"
            spellCheck="false"
            autoComplete="none"
            type="text"
            name="emailInput"
            id="emailInput"
            value={userInfo.email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordInput">Password</label>
          <input
            onInput={e => {
              handlePasswordInput(e);
            }}
            className="rounded-md pl-2 py-2 border-2 border-solid border-[#DED2D9]"
            placeholder="Email"
            spellCheck="false"
            autoComplete="none"
            type="text"
            name="passwordInput"
            id="passwordInput"
            value={userInfo.password}
          />
        </div>
        <div className="flex justify-center gap-4">
          <button className="bg-[#7F265B] text-white rounded-md px-8 py-2" type="submit">
            Create Account
          </button>
          <button onClick={handleReset} className="bg-[#7F265B] text-white rounded-md px-8 py-2" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;

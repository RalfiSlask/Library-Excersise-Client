import { createContext, ReactNode, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type ContextTypes = {
  userInfo: {
    email: string;
    password: string;
  };
  handlePasswordInput: (e: FormEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleEmailInput: (e: FormEvent<HTMLInputElement>) => void;
  handleReset: () => void;
};

export const CreateAccountContext = createContext<ContextTypes | undefined>(undefined);

type ContextType = {
  children: ReactNode;
};

export const CreateContextProvider: React.FC<ContextType> = ({ children }) => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

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

  const contextValue = {
    userInfo: userInfo,
    handlePasswordInput: handlePasswordInput,
    handleSubmit: handleSubmit,
    handleEmailInput: handleEmailInput,
    handleReset: handleReset,
  };

  return <CreateAccountContext.Provider value={contextValue}>{children}</CreateAccountContext.Provider>;
};

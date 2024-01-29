import { createContext, ReactNode, useState, FormEvent } from 'react';
/* import { useNavigate } from 'react-router-dom'; */

type ContextTypes = {
  userInfo: {
    email: string;
    password: string;
  };
  setUserInfo: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
  handlePasswordInput: (e: FormEvent<HTMLInputElement>) => void;
  handleEmailInput: (e: FormEvent<HTMLInputElement>) => void;
  handleReset: () => void;
};

export const CreateAccountContext = createContext<ContextTypes | undefined>(undefined);

type ContextType = {
  children: ReactNode;
};

export const CreateContextProvider: React.FC<ContextType> = ({ children }) => {
  /*   const navigate = useNavigate(); */

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleReset = () => {
    setUserInfo({ email: '', password: '' });
    setErrorMessage('');
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
    setUserInfo: setUserInfo,
    handlePasswordInput: handlePasswordInput,
    handleEmailInput: handleEmailInput,
    handleReset: handleReset,
  };

  return <CreateAccountContext.Provider value={contextValue}>{children}</CreateAccountContext.Provider>;
};

import { ReactNode, createContext, useState, FormEvent, useEffect } from 'react';

export const LoginContext = createContext<ContextValueTypes | undefined>(undefined);

type ContextType = {
  children: ReactNode;
};

type LoggedInUserType = {
  id: string;
  email: string;
};

type LoginType = {
  email: string;
  password: string;
};

type ContextValueTypes = {
  loggedInUser: LoggedInUserType;
  loginInfo: LoginType;
  isRememberMeChecked: boolean;
  errorMessage: string;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginType>>;
  setLoggedInUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      email: string;
    }>
  >;
  setIsRemeberMeChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  handleLoginReset: () => void;
  handlePasswordInput: (e: FormEvent<HTMLInputElement>) => void;
  handleEmailInput: (e: FormEvent<HTMLInputElement>) => void;
  handleClickOnRemenberMe: () => void;
};

export const LoginContextProvider: React.FC<ContextType> = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [loggedInUser, setLoggedInUser] = useState({ id: '', email: '' });
  const [isRememberMeChecked, setIsRemeberMeChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  const handleLoginReset = () => {
    setLoginInfo({ email: '', password: '' });
    setErrorMessage('');
  };

  const handleClickOnRemenberMe = () => {
    setIsRemeberMeChecked(prev => !prev);
  };

  const handlePasswordInput = (e: FormEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const target = e.target as HTMLInputElement;
    setLoginInfo(prev => ({ ...prev, password: target.value }));
  };

  const handleEmailInput = (e: FormEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const target = e.target as HTMLInputElement;
    setLoginInfo(prev => ({ ...prev, email: target.value }));
  };

  const contextValue: ContextValueTypes = {
    // states
    loggedInUser: loggedInUser,
    loginInfo: loginInfo,
    isRememberMeChecked: isRememberMeChecked,
    errorMessage: errorMessage,
    // setters
    setLoginInfo: setLoginInfo,
    setLoggedInUser: setLoggedInUser,
    setIsRemeberMeChecked: setIsRemeberMeChecked,
    setErrorMessage: setErrorMessage,
    // functions
    handleLoginReset: handleLoginReset,
    handlePasswordInput: handlePasswordInput,
    handleEmailInput: handleEmailInput,
    handleClickOnRemenberMe: handleClickOnRemenberMe,
  };
  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};

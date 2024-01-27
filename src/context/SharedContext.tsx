import { ReactNode, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

type SharedContextTypes = {
  handleClickOnGoBack: (path: string) => void;
};

type ContextType = {
  children: ReactNode;
};

export const SharedContext = createContext<SharedContextTypes | undefined>(undefined);

export const SharedContextProvider: React.FC<ContextType> = ({ children }) => {
  const navigate = useNavigate();

  const handleClickOnGoBack = (path: string) => {
    navigate(path);
  };

  const contextValue = {
    handleClickOnGoBack: handleClickOnGoBack,
  };

  return <SharedContext.Provider value={contextValue}>{children}</SharedContext.Provider>;
};

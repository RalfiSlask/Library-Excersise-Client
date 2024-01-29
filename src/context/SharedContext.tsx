import { ReactNode, createContext } from 'react';

type SharedContextTypes = {};

type ContextType = {
  children: ReactNode;
};

export const SharedContext = createContext<SharedContextTypes | undefined>(undefined);

export const SharedContextProvider: React.FC<ContextType> = ({ children }) => {
  const contextValue = {};

  return <SharedContext.Provider value={contextValue}>{children}</SharedContext.Provider>;
};

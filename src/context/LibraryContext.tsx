import { ReactNode, createContext, useState } from 'react';
import { IBook } from '../utils/types';

type LibraryContextTypes = {
  books: IBook[];
  error: string | null;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

type ContextType = {
  children: ReactNode;
};

export const LibraryContext = createContext<LibraryContextTypes | undefined>(undefined);

export const LibraryProvider: React.FC<ContextType> = ({ children }) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  const contextValue: LibraryContextTypes = {
    books: books,
    error: error,
    setBooks: setBooks,
    setError: setError,
  };

  return <LibraryContext.Provider value={contextValue}>{children}</LibraryContext.Provider>;
};

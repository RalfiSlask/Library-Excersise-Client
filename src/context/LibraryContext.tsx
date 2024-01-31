import { ReactNode, createContext, useEffect, useState } from 'react';
import { IBook } from '../utils/types';

type LibraryContextTypes = {
  books: IBook[];
  error: string | null;
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  fetchBooks: () => Promise<void>;
};

type ContextType = {
  children: ReactNode;
};

export const LibraryContext = createContext<LibraryContextTypes | undefined>(undefined);

export const LibraryProvider: React.FC<ContextType> = ({ children }) => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/library');
      console.log('response', response);
      if (response.ok) {
        const jsonBooks = await response.json();
        console.log('json', jsonBooks);
        setBooks(jsonBooks);
      } else {
        console.log('failed to fetch books');
        setError('Failed to fetch books from the server');
        setBooks([]);
      }
    } catch (err) {
      setError('Unable to connect to the server');
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('hej');
  }, [books]);

  const contextValue: LibraryContextTypes = {
    books: books,
    error: error,
    setBooks: setBooks,
    setError: setError,
    fetchBooks: fetchBooks,
  };

  return <LibraryContext.Provider value={contextValue}>{children}</LibraryContext.Provider>;
};

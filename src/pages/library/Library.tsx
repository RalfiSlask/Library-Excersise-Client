import { useEffect, useContext } from 'react';
import BookContainer from './BookContainer';
import FormContainer from './FormContainer';
import { useLocation } from 'react-router-dom';
import { LibraryContext } from '../../context/LibraryContext';

function Library() {
  const libraryContext = useContext(LibraryContext);

  if (!libraryContext) {
    return;
  }

  const { books, error, setBooks, setError } = libraryContext;

  const location = useLocation();
  const email = location.state.email;
  useEffect(() => {
    console.log(location.state);
    console.log(email);
  }, []);

  const fetchBooks = async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/library');
      if (response.ok) {
        const jsonBooks = await response.json();
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

  return (
    <>
      <main className="flex flex-col gap-2 px-5 w-[400px]">
        <button>Logout</button>
        <p>Logged in as {email}</p>
        <div className="flex flex-wrap gap-6 mt-[100px] justify-center">
          {error ? (
            <p>Error: {error}</p>
          ) : books.length > 0 ? (
            books.map(book => {
              const { id } = book;
              return <BookContainer key={id} bookObject={book} fetchBooks={fetchBooks} />;
            })
          ) : (
            <p>No books avaiable</p>
          )}
        </div>
        <FormContainer fetchBooks={fetchBooks} />
      </main>
    </>
  );
}

export default Library;

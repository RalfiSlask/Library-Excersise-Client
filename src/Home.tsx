import { useEffect, useState } from 'react';
import BookContainer from './BookContainer';
import FormContainer from './FormContainer';
import { IBook } from './utils/types';

function Home() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    fetchBooks();
    console.log(books);
  }, []);

  return (
    <>
      <main className="flex flex-col gap-2 px-5 w-[400px]">
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

export default Home;

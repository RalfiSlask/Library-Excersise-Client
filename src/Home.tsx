import { useEffect, useState } from 'react';
import BookContainer from './BookContainer';
import FormContainer from './FormContainer';
import { IBook } from './utils/types';

function Home() {
  const [books, setBooks] = useState<IBook[]>();
  const fetchBooks = async () => {
    try {
      const promise = await fetch('http://localhost:3000/library');
      const jsonBooks = await promise.json();
      console.log(jsonBooks);
      setBooks(jsonBooks);
      console.log(jsonBooks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <main className="flex flex-col gap-2 px-5">
        <div className="flex flex-wrap gap-6 mt-[100px] justify-center">
          {books !== undefined
            ? books.map(book => {
                const { id } = book;
                return <BookContainer key={id} bookObject={book} fetchBooks={fetchBooks} />;
              })
            : null}
        </div>
        <FormContainer fetchBooks={fetchBooks} />
      </main>
    </>
  );
}

export default Home;

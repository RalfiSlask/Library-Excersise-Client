import { useEffect, useState } from 'react';
import BookContainer from './BookContainer';
import FormContainer from './FormContainer';

interface IBook {
  id: number;
  bookName: string;
  author: string;
  loaned: boolean;
}

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
    console.log(books);
  }, []);

  return (
    <>
      <main className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-6 mt-[100px]">
          {books !== undefined
            ? books.map(book => {
                const { id, bookName, loaned, author } = book;
                return (
                  <BookContainer
                    key={id}
                    id={id}
                    bookName={bookName}
                    loaned={loaned}
                    author={author}
                    fetchBooks={fetchBooks}
                  />
                );
              })
            : null}
        </div>
        <FormContainer fetchBooks={fetchBooks} />
      </main>
    </>
  );
}

export default Home;

import { useEffect, useContext } from 'react';
import BookContainer from './BookContainer';
import FormContainer from './FormContainer';
import { LibraryContext } from '../../context/LibraryContext';
import { LoginContext } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

function Library() {
  const libraryContext = useContext(LibraryContext);
  const loginContext = useContext(LoginContext);

  if (!libraryContext || !loginContext) {
    return;
  }

  const { books, error, setBooks, setError } = libraryContext;
  const { loggedInUser } = loginContext;

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
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

  const handleClickOnLogout = () => {};
  navigate('/');
  return (
    <>
      <div className="w-full h-full relative">
        <header className="w-screen h-12 bg-[#7F265B] border-b-2 border-solid absolute border-purple-600 z-10"></header>
        <main className="w-full h-full flex gap-10 justify-center relative ">
          <div className="w-[250px] h-full border border-r border-red-600 absolute left-0 gap-2 bg-white flex flex-col items-center justify-end pb-8">
            <p>Logged in as {loggedInUser.email}</p>
            <button className="text-lg">Logout</button>
          </div>
          <div>
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
            <div className="w-[400px]">
              <FormContainer fetchBooks={fetchBooks} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Library;

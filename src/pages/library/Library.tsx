import { useContext, FormEvent, useState, useEffect } from 'react';
import BookContainer from './BookContainer';
import FormContainer from './FormContainer';
import { LibraryContext } from '../../context/LibraryContext';
import { LoginContext } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

function Library() {
  const libraryContext = useContext(LibraryContext);
  const loginContext = useContext(LoginContext);
  const [imageUrl, setImageUrl] = useState('');

  if (!libraryContext || !loginContext) {
    return;
  }

  const { books, error, setError, setBooks } = libraryContext;
  const { loggedInUser } = loginContext;

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
    fetchBooks();
  }, []);

  const navigate = useNavigate();

  const uploadProfilePicture = async (file: any) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`http://localhost:3000/image/savefile/${loggedInUser.id}`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const jsonData = await response.json();
        // hantera här nedan
        setImageUrl(jsonData.imageUrl);
      }
    } catch (err) {
      console.log(err, 'error');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const fileInput = target.image.files[0];
    if (fileInput) {
      await uploadProfilePicture(fileInput);
    } else {
      console.log('file is not valid');
    }
  };

  const handleClickOnLogout = () => {
    navigate('/');
  };

  return (
    <>
      <div className="w-full h-full relative">
        <header className="w-screen h-14 bg-[#7F265B] border-b-2 border-solid fixed border-purple-600 z-10 px-4 flex items-center text-white">
          <h1 className="text-[2rem]">Library</h1>
        </header>
        <main className="w-full h-full flex gap-10 justify-center relative pb-20 pl-[300px]">
          <div className="w-[250px] h-full border border-r border-red-600 fixed left-0 gap-2 bg-white flex flex-col items-center justify-end pb-8">
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
              <input type="file" name="image" />
              <button type="submit">Send</button>
            </form>
            <img src={imageUrl} alt="profile pic" />
            <p>{loggedInUser.email}</p>
            <button onClick={handleClickOnLogout} className="text-lg">
              Logout
            </button>
          </div>
          <div className="w-[1110px] flex flex-col items-center gap-20">
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

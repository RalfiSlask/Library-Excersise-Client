import { useNavigate } from 'react-router-dom';
import { IBook } from '../../utils/types';

interface IBookProps {
  bookObject: IBook;
  fetchBooks: () => Promise<void>;
}

const BookContainer = ({ bookObject, fetchBooks }: IBookProps) => {
  const navigate = useNavigate();
  const { bookName, loaned, author, id } = bookObject;

  const handleClickOnBook = () => {
    navigate('/info', { state: { bookName, loaned, author } });
  };

  const changeStateOfLoaned = async () => {
    try {
      const newLoanedState = !loaned;
      const promise = await fetch(`http://localhost:3000/loan/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loaned: newLoanedState }),
      });
      const jsonData = await promise.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async () => {
    const response = await fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookObject),
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
    } else {
      console.log('error getting response');
    }
  };

  const handleClickOnLoaned = async () => {
    await changeStateOfLoaned();
    await fetchBooks();
  };

  const handleClickOnRemove = async () => {
    await deleteBook();
    await fetchBooks();
  };

  return (
    <div className="flex flex-col gap-4 items-center bg-white p-4 rounded-xl">
      <h2 onClick={handleClickOnBook} className="cursor-pointer hover:opacity-70">
        {bookName}
      </h2>
      <button
        onClick={handleClickOnLoaned}
        className={`${loaned ? 'bg-[#b73d86]' : 'bg-[#7F265B]'}  text-white py-2 w-40 rounded-full`}
      >
        {loaned ? 'give back' : 'loan'}
      </button>
      <button onClick={handleClickOnRemove} className="bg-[#7F265B] text-white py-2 w-40 rounded-full">
        Remove Book
      </button>
    </div>
  );
};

export default BookContainer;

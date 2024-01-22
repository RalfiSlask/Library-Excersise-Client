import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBook } from './utils/types';

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

  const array = [
    { id: 1, book: 'hej' },
    { id: 2, book: 'mumma' },
  ];

  const newArray = array.map(item => {
    if (item.id === 2) {
      return { ...item, book: 'Snuffe' };
    } else {
      return item;
    }
  });
  console.log(newArray);

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
    const response = await fetch('http://localhost:3000/');
  };

  const handleClickOnLoaned = async () => {
    await changeStateOfLoaned();
    await fetchBooks();
  };

  const handleClickOnRemove = () => {};

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 onClick={handleClickOnBook} className="cursor-pointer hover:opacity-70">
        {bookName}
      </h2>
      <button onClick={handleClickOnLoaned} className={`${loaned ? 'bg-slate-400' : 'bg-slate-500'} w-40 rounded-full`}>
        {loaned ? 'give back' : 'loan'}
      </button>
      <button onClick={handleClickOnRemove} className="bg-slate-500">
        Remove Book
      </button>
    </div>
  );
};

export default BookContainer;

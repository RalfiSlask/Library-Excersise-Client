import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IBook {
  bookName: string;
  loaned: boolean;
  author?: string;
  id: number;
  fetchBooks: () => Promise<void>;
}

const BookContainer = ({ bookName, loaned, author, id, fetchBooks }: IBook) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(bookName, loaned);
  }, []);

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
      const promise = await fetch(`http://localhost:3000/loan/:${id}`, {
        method: 'POST',
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

  const handleClickOnLoaned = async () => {
    await changeStateOfLoaned();
    await fetchBooks();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 onClick={handleClickOnBook}>{bookName}</h2>
      <button onClick={handleClickOnLoaned} className={`${loaned ? 'bg-slate-200' : 'bg-slate-500'} rounded-full`}>
        {loaned ? 'give back' : 'loan'}
      </button>
    </div>
  );
};

export default BookContainer;

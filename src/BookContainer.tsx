import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IBook {
  bookName: string;
  loaned: boolean;
  author?: string;
}

const BookContainer = ({ bookName, loaned, author }: IBook) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(bookName, loaned);
  }, []);

  const handleClickOnBook = () => {
    navigate('/info', { state: { bookName, loaned, author } });
  };

  const changeStateOfLoaned = async () => {};

  const handleClickOnLoaned = () => {};

  return (
    <div className="flex flex-col gap-4">
      <h2 onClick={handleClickOnBook}>{bookName}</h2>
      <button className={`${loaned ? 'bg-slate-200' : 'bg-slate-500'} rounded-full`}>
        {loaned ? 'loaned' : 'not loaned'}
      </button>
    </div>
  );
};

export default BookContainer;

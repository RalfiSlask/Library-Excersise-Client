import { useLocation } from 'react-router-dom';
import GoBackButton from '../../components/GoBackButton';

const BookInfo = () => {
  const location = useLocation();

  const { bookName, loaned, author } = location.state;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[1.75rem] mt-10">{bookName}</h2>
      <p>{author}</p>
      <button>{loaned ? 'Loaned' : 'Not loaned'}</button>
      <GoBackButton path={'/library'} />
    </div>
  );
};

export default BookInfo;

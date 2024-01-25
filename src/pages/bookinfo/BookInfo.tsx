import { useLocation, useNavigate } from 'react-router-dom';

const BookInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickOnGoBack = () => {
    navigate('/');
  };

  const { bookName, loaned, author } = location.state;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[1.75rem] mt-10">{bookName}</h2>
      <p>{author}</p>
      <button>{loaned ? 'Loaned' : 'Not loaned'}</button>
      <button onClick={handleClickOnGoBack}>Go back</button>
    </div>
  );
};

export default BookInfo;

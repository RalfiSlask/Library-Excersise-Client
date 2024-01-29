import { useContext } from 'react';
import { SharedContext } from '../context/SharedContext';
import { useNavigate } from 'react-router-dom';

interface IGoBackButtonProps {
  path: string;
}

const GoBackButton: React.FC<IGoBackButtonProps> = ({ path }) => {
  const sharedContext = useContext(SharedContext);

  const navigate = useNavigate();

  if (!sharedContext) {
    return null;
  }

  const handleClickOnGoBack = (path: string) => {
    navigate(path);
  };

  return (
    <button
      onClick={() => {
        handleClickOnGoBack(path);
      }}
      className="button-purple h-10"
    >
      Go Back
    </button>
  );
};

export default GoBackButton;

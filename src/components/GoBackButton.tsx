import { useContext } from 'react';
import { SharedContext } from '../context/SharedContext';

interface IGoBackButtonProps {
  path: string;
}

const GoBackButton: React.FC<IGoBackButtonProps> = ({ path }) => {
  const sharedContext = useContext(SharedContext);

  if (!sharedContext) {
    return null;
  }

  const { handleClickOnGoBack } = sharedContext;

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

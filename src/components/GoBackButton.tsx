import { useContext } from 'react';
import { SharedContext } from '../context/SharedContext';

const GoBackButton = () => {
  const sharedContext = useContext(SharedContext);

  if (!sharedContext) {
    return null;
  }

  const { handleClickOnGoBack } = sharedContext;

  return (
    <button
      onClick={() => {
        handleClickOnGoBack('/');
      }}
      className="button-purple h-10"
    >
      Go Back
    </button>
  );
};

export default GoBackButton;

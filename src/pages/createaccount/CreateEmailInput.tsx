import { useContext } from 'react';
import { CreateAccountContext } from '../../context/CreateAccountContext';

const CreateEmailInput = () => {
  const createAccountContext = useContext(CreateAccountContext);

  if (!createAccountContext) {
    return;
  }

  const { userInfo, handleEmailInput } = createAccountContext;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label htmlFor="emailInput">Email</label>
        <p className="text-red-500"></p>
      </div>

      <input
        onInput={e => {
          handleEmailInput(e);
        }}
        className="rounded-md pl-2 py-2 border-2 border-solid border-[#DED2D9]"
        placeholder="Email"
        spellCheck="false"
        autoComplete="none"
        type="text"
        name="emailInput"
        id="emailInput"
        value={userInfo.email}
      />
    </div>
  );
};

export default CreateEmailInput;

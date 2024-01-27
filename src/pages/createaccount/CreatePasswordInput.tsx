import { useContext } from 'react';
import { CreateAccountContext } from '../../context/CreateAccountContext';

const CreatePasswordInput = () => {
  const createAccountContext = useContext(CreateAccountContext);

  if (!createAccountContext) {
    return;
  }

  const { userInfo, handlePasswordInput } = createAccountContext;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="passwordInput">Password</label>
      <input
        onInput={e => {
          handlePasswordInput(e);
        }}
        className="rounded-md pl-2 py-2 border-2 border-solid border-[#DED2D9]"
        placeholder="Password"
        spellCheck="false"
        autoComplete="none"
        type="text"
        name="passwordInput"
        id="passwordInput"
        value={userInfo.password}
      />
    </div>
  );
};

export default CreatePasswordInput;

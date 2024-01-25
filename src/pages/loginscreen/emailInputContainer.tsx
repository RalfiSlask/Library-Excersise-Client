import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';

const emailInputContainer = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { handleEmailInput, errorMessage, loginInfo } = loginContext;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label htmlFor="emailInput">Email</label>
        <p className="text-red-500">{errorMessage}</p>
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
        value={loginInfo.email}
      />
    </div>
  );
};

export default emailInputContainer;

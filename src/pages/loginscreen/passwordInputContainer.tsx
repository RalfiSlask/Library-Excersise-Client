import { LoginContext } from '../../context/LoginContext';
import { useContext } from 'react';

const PasswordInputContainer = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return;
  }

  const { handlePasswordInput, loginInfo } = loginContext;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="passwordInput">Password</label>
      <input
        onInput={e => {
          handlePasswordInput(e);
        }}
        className="rounded-md pl-2 py-2 border-2 border-solid border-[#DED2D9]"
        placeholder="Email"
        spellCheck="false"
        autoComplete="none"
        type="text"
        name="passwordInput"
        id="passwordInput"
        value={loginInfo.password}
      />
    </div>
  );
};

export default PasswordInputContainer;

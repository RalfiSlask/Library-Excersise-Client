import { useContext } from 'react';
import { CreateAccountContext } from '../../context/CreateAccountContext';
import CreateEmailInput from './CreateEmailInput';
import CreatePasswordInput from './CreatePasswordInput';
import GoBackButton from '../../components/GoBackButton';
import SubmitButton from '../../components/SubmitButton';

const CreateAccount = () => {
  const createAccountContext = useContext(CreateAccountContext);

  if (!createAccountContext) {
    return;
  }

  const { handleSubmit, handleReset } = createAccountContext;

  return (
    <main className="w-full flex justify-center relative">
      <div className="absolute left-4 top-4">
        <GoBackButton path={'/'} />
      </div>
      <div className="flex flex-col gap-10 mt-[200px] w-[600px]">
        <h1 className="text-[#525252] text-[2.25rem] font-bold">Create Account</h1>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
          id="formInput"
          className="flex flex-col gap-4"
        >
          <CreateEmailInput />
          <CreatePasswordInput />
          <div className="flex justify-center gap-4">
            <SubmitButton title={'Create Account'} />
            <button onClick={handleReset} className="bg-[#7F265B] text-white rounded-md px-8 py-2" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateAccount;

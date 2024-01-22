import { FormEvent } from 'react';

interface INameInputProps {
  handleTitleInput: (e: FormEvent<HTMLInputElement>) => void;
  bookName: string;
}

const NameInputContainer: React.FC<INameInputProps> = ({ handleTitleInput, bookName }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="nameInput">Name</label>
      <input
        onInput={e => {
          handleTitleInput(e);
        }}
        className="rounded-md pl-2 py-2"
        spellCheck="false"
        autoComplete="none"
        placeholder="Title"
        type="text"
        name="nameInput"
        id="nameInput"
        value={bookName}
      />
    </div>
  );
};

export default NameInputContainer;

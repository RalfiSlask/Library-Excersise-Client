import { FormEvent } from 'react';

interface IAuthorInputProps {
  handleAuthorInput: (e: FormEvent<HTMLInputElement>) => void;
  authorName: string;
}

const AuthorInputContainer: React.FC<IAuthorInputProps> = ({ handleAuthorInput, authorName }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="authorInput">Author</label>
      <input
        onInput={e => {
          handleAuthorInput(e);
        }}
        className="rounded-md pl-2 py-2"
        placeholder="Author"
        spellCheck="false"
        autoComplete="none"
        type="text"
        name="authorInput"
        id="authorInput"
        value={authorName}
      />
    </div>
  );
};

export default AuthorInputContainer;

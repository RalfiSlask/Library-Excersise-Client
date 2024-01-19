import { FormEvent, useState } from 'react';

interface IfetchProp {
  fetchBooks: () => Promise<void>;
}

const FormContainer = ({ fetchBooks }: IfetchProp) => {
  const [inputValues, setInputValues] = useState({
    bookName: '',
    author: '',
  });

  const handleTitleInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValues(prev => ({ ...prev, bookName: target.value }));
  };

  const handleAuthorInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputValues(prev => ({ ...prev, author: target.value }));
  };

  const submitBook = async () => {
    try {
      const response = await fetch('http://localhost:3000/library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues),
      });
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputValues.bookName.trim().length <= 0 || inputValues.author.trim().length <= 0) {
      alert('you have to fill in input');
    } else {
      await submitBook();
      await fetchBooks();
      setInputValues({ bookName: '', author: '' });
    }
  };

  return (
    <form
      id="formInput"
      className="flex flex-col gap-4"
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="nameInput">Name</label>
        <input
          onInput={e => {
            handleTitleInput(e);
          }}
          className="rounded-md pl-2 py-1"
          spellCheck="false"
          autoComplete="none"
          placeholder="Title"
          type="text"
          name="nameInput"
          id="nameInput"
          value={inputValues.bookName}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="authorInput">Author</label>
        <input
          onInput={e => {
            handleAuthorInput(e);
          }}
          className="rounded-md pl-2 py-1"
          placeholder="Author"
          spellCheck="false"
          autoComplete="none"
          type="text"
          name="authorInput"
          id="authorInput"
          value={inputValues.author}
        />
      </div>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-500" type="submit">
          Submit
        </button>
        <button className="bg-blue-500" type="reset">
          Reset
        </button>
      </div>
    </form>
  );
};

export default FormContainer;

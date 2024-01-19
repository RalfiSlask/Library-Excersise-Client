import { FormEvent } from "react";

interface IhandleInput {
  handleInput: (
    e: FormEvent<HTMLInputElement>,
    property: "password" | "userName"
  ) => void;
  userName: string;
}

const NameInput = ({ handleInput, userName }: IhandleInput) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="userName">Name</label>
      <input
        onInput={(e) => {
          handleInput(e, "userName");
        }}
        value={userName}
        autoComplete="off"
        spellCheck="false"
        type="text"
        name="userName"
        id="userName"
        placeholder="name"
        className="pl-2 border border-teal-600 rounded-lg h-8 w-[400px] bg-slate-500 text-white"
      />
    </div>
  );
};

export default NameInput;

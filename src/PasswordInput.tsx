import { FormEvent } from "react";

interface IhandleInput {
  handleInput: (
    e: FormEvent<HTMLInputElement>,
    property: "password" | "userName"
  ) => void;
  password: string;
}

const PasswordInput = ({ handleInput, password }: IhandleInput) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="password">Password</label>
      <input
        onInput={(e) => {
          handleInput(e, "password");
        }}
        value={password}
        autoComplete="off"
        spellCheck="false"
        type="password"
        id="password"
        placeholder="password"
        className="pl-2 border border-teal-600 rounded-lg h-8 w-[400px] bg-slate-500 text-white"
      />
    </div>
  );
};

export default PasswordInput;

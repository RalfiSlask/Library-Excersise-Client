type SubmitProps = {
  title: string;
};

const SubmitButton: React.FC<SubmitProps> = ({ title }) => {
  return (
    <button className="bg-[#7F265B] text-white rounded-md px-8 py-2" type="submit">
      {title}
    </button>
  );
};

export default SubmitButton;

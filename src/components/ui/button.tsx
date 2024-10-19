"use client";

type BtnProps = {
    value: string,
    onClick: () => void,
    icon?: JSX.Element
 };

const Button = ({ value, onClick, icon }: BtnProps) => {

  return (
    <button
      className="flex items-center text-md text-white bg-blue-700 px-2 py-1 rounded truncate"
      onClick={onClick}
    >
      <span className="me-2">{icon}</span>
      {value}
    </button>
  );
};

export default Button;

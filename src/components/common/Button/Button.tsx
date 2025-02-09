import { FC } from "react";

interface IButton {
  type?: 'button' | 'submit' | 'reset',
  label: string
  ariaLabel?: string
  onClick?: () => void
  className?: string
}

const Button: FC<IButton> = ({
  type,
  label,
  ariaLabel = label,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type ? type : "submit"}
      aria-label={ariaLabel}
      className={`px-[20px] py-[10px] cursor-pointer bg-[#4141dc] text-[#fff] rounded h-[40px] ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};


export default Button;
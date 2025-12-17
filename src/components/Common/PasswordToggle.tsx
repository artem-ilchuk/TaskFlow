import { memo } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { PasswordToggleProps } from "../../types/common";

const PasswordToggle: React.FC<PasswordToggleProps> = ({
  visible,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-600 z-10"
    >
      {visible ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default memo(PasswordToggle);

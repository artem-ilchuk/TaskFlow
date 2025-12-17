import { useState } from "react";

export const PasswordHide = (): {
  passwordVisibility: boolean;
  handlePasswordVisibility: () => void;
} => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return { passwordVisibility, handlePasswordVisibility };
};

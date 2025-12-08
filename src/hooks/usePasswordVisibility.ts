import { useState } from "react";

export const PasswordHide = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return { passwordVisibility, handlePasswordVisibility };
};

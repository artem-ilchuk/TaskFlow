import { useState, useCallback } from "react";

export const PasswordHide = (): {
  passwordVisibility: boolean;
  handlePasswordVisibility: () => void;
} => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const handlePasswordVisibility = useCallback(() => {
    setPasswordVisibility((prev) => !prev);
  }, []);

  return { passwordVisibility, handlePasswordVisibility };
};

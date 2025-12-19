import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { z } from "zod";

interface UseAuthFormProps<T> {
  initialState: T;
  schema: z.ZodType<T, any, any>;
  onSubmit: (values: T) => Promise<void>;
}
export const useAuthForm = <T extends Record<string, any>>({
  initialState,
  schema,
  onSubmit,
}: UseAuthFormProps<T>) => {
  const [form, setForm] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const result = schema.safeParse(form);
      if (!result.success) {
        const formErrors: Partial<Record<keyof T, string>> = {};
        result.error.issues.forEach((issue) => {
          const key = issue.path[0] as keyof T;
          formErrors[key] = issue.message;
        });
        setErrors(formErrors);
        return;
      }

      setErrors({});
      try {
        await onSubmit(form);
      } catch (err) {
        console.error("Form submission error:", err);
      }
    },
    [form, schema, onSubmit]
  );

  const resetForm = useCallback(() => setForm(initialState), [initialState]);

  return { form, errors, handleChange, handleSubmit, resetForm };
};

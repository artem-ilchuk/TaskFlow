export const partial = <P extends object, PP extends Partial<P>>(
  Component: React.ComponentType<P>,
  partialProps: PP
) => {
  return (props: Omit<P, keyof PP>) => {
    const mergedProps = {
      ...partialProps,
      ...props,
    } as unknown as P;

    return <Component {...mergedProps} />;
  };
};

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "solid" | "outline";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "accent";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    size = "md",
    variant = "outline",
    color = "accent",
    children,
    className = "",
    ...otherProps
  } = props;

  const sizeClasses: Record<ButtonSize, string> = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
    xl: "btn-xl",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    solid: `btn-${color}`,
    outline: `btn-outline btn-${color}`,
  };

  return (
    <button
      {...otherProps}
      className={`
        btn
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        transition-all duration-300 ease-in-out
        hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
};

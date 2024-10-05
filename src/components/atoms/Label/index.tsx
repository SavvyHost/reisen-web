import { ReactNode } from "react";
import { tv } from "tailwind-variants";

const label = tv({
  base: "inline-block capitalize !text-[#3F4254] ",
  variants: {
    color: {
      primary: "text-[#3F4254]",
    },
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
    requigreen: {
      true: 'after:content-["*"] after:text-maingreen after:me-1',
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});

export interface LabelProps_TP
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: ReactNode | string;
  htmlFor: string;
  size?: "sm" | "md" | "lg";
  requigreen?: boolean;
}

export const Label = ({
  htmlFor,
  className,
  children,
  size = "sm",
  requigreen = false,
}: LabelProps_TP) => {
  return (
    <label
      className={label({
        className,
        size,
        requigreen,
      })}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

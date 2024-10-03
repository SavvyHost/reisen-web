import { FaWeightHanging } from "react-icons/fa"
type DeleteProps_TP = {
  className?: string
  action?: () => void
  size?: number
}
export const Weight = ({
  className,
  action,
  size,
  ...props
}: DeleteProps_TP) => {
  return (
    <FaWeightHanging
      size={size}
      className={` fill-mainred cursor-pointer  ${className}`}
      onClick={action}
      {...props}
    />
  );
}

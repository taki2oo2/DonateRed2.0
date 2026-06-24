import { Button } from "./ui/button";
import { ComponentProps, ReactNode } from "react";

interface AppButtonProps extends ComponentProps<typeof Button> {
  children: ReactNode;
}

const MyButton = ({
  children,
  disabled,
  ...props
}: AppButtonProps) => {
  return (
    <Button  disabled={disabled} {...props}>
      {children}
    </Button>
  );
};

export default MyButton;

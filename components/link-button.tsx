import { Button, type ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type LinkButtonProps = {
  href: string;
  label: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  external?: boolean;
  variant?: ButtonProps["variant"];
};

export const LinkButton = ({
  href,
  label,
  leftIcon,
  rightIcon,
  external,
  variant = "default",
}: LinkButtonProps) => {
  const LeftIcon = leftIcon ? leftIcon : null;
  const RightIcon = rightIcon ? rightIcon : null;

  if (external) {
    <Button variant={variant} asChild>
      <a href={href} target="_blank">
        {LeftIcon && <LeftIcon size={16} className="mr-2" />}
        {label}
        {RightIcon && <RightIcon size={16} className="ml-2" />}
      </a>
    </Button>;
  }

  return (
    <Button variant={variant} asChild>
      <Link href={href}>
        {LeftIcon && <LeftIcon size={16} className="mr-2" />}
        {label}
        {RightIcon && <RightIcon size={16} className="ml-2" />}
      </Link>
    </Button>
  );
};

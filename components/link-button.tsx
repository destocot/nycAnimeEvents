import { Button, type ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type LinkButtonProps = {
  href: string;
  label: string;
  srOnlyLabel?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  external?: boolean;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

export const LinkButton = ({
  href,
  label,
  srOnlyLabel,
  leftIcon,
  rightIcon,
  external,
  variant = "default",
  size = "default",
  className,
}: LinkButtonProps) => {
  if (external) {
    <Button variant={variant} size={size} className={className} asChild>
      <a href={href} target="_blank">
        <LinkButtonChildren
          label={label}
          srOnlyLabel={srOnlyLabel}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      </a>
    </Button>;
  }

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link href={href}>
        <LinkButtonChildren
          label={label}
          srOnlyLabel={srOnlyLabel}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      </Link>
    </Button>
  );
};

type LinkButtonChildrenProps = {
  label: string;
  srOnlyLabel?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
};

const LinkButtonChildren = ({
  label,
  srOnlyLabel,
  leftIcon,
  rightIcon,
}: LinkButtonChildrenProps) => {
  const LeftIcon = leftIcon ? leftIcon : null;
  const RightIcon = rightIcon ? rightIcon : null;

  return (
    <>
      {LeftIcon && <LeftIcon size={16} className={srOnlyLabel ? "" : "mr-2"} />}
      <span className={srOnlyLabel ? "sr-only" : ""}>{label}</span>
      {RightIcon && (
        <RightIcon size={16} className={srOnlyLabel ? "" : "ml-2"} />
      )}
    </>
  );
};

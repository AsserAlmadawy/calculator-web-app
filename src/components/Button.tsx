"use client";

import "@/styles/Button.css";

export interface ButtonProps {
  value: string | React.ReactNode;
  className: string;
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
  ref?: React.RefObject<HTMLDivElement>;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => <div className={`button ${props.className}`} onClick={props.onClick} ref={props.ref}>{props.value}</div>
"use client";

import React, { useContext } from "react";
import { Equation } from "./Equation";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";
import { calculate } from "@/lib/actions";
import { AppContext } from "@/context/context";
import type { StateValues } from "@/context/context";
import "@/styles/Calculator.css";

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export const Calculator: React.FC = () => {
  const { equation, setEquation } = useContext<StateValues>(AppContext);
  const handleBackspace: () => void = () => equation.length === 1 ? setEquation!("0") : setEquation!(equation.slice(0, equation.length - 1));
  const buttons: ButtonProps[] = [
    { value: "7", className: "append" },
    { value: "8", className: "append" },
    { value: "9", className: "append" },
    { value: "00", className: "append two-zeroes" },
    { value: "000", className: "append three-zeroes" },
    { value: "4", className: "append" },
    { value: "5", className: "append" },
    { value: "6", className: "append" },
    { value: "C", className: "clear" },
    {
      value: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" onClick={handleBackspace}>
          <path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
        </svg>
      ),
      className: "backspace"
    },
    { value: "1", className: "append" },
    { value: "2", className: "append" },
    { value: "3", className: "append" },
    { value: "+", className: "append operator" },
    { value: "-", className: "append operator" },
    { value: "0", className: "append zero" },
    { value: ".", className: "append point" },
    { value: "*", className: "append operator" },
    { value: "/", className: "append operator" },
    { value: "=", className: "equality operator" }
  ];

  interface Interact {
    (e: React.MouseEvent<HTMLDivElement>): void;
  }

  const interact: Interact = async (e: React.MouseEvent<HTMLDivElement>) => {
    if ("classList" in e.target && "innerText" in e.target) {
      const classList: DOMTokenList = e.target.classList as DOMTokenList,
        innerText: string = e.target.innerText as string;

      if (equation === "0") {
        if (
          classList.contains("append") &&
          !(
            classList.contains("zero") ||
            classList.contains("two-zeroes") ||
            classList.contains("three-zeroes")
          )
        )
          classList.contains("point") || classList.contains("operator")
            ? setEquation!(equation + innerText)
            : setEquation!(innerText);
      } else {
        if (classList.contains("append")) {
          if (equation.length === 17) return;
          else {
            if (
              (classList.contains("point") && equation[equation.length - 1] === ".") ||
              (classList.contains("operator") || classList.contains("point")) &&
                (equation[equation.length - 1] === "+" ||
                  equation[equation.length - 1] === "-" ||
                  equation[equation.length - 1] === "×" ||
                  equation[equation.length - 1] === "÷" ||
                  equation[equation.length - 1] === ".")
            )
              return;
            else setEquation!(equation + innerText);
          }
        }

        if (classList.contains("backspace")) handleBackspace();
        if (classList.contains("clear")) setEquation!("0");
        if (classList.contains("equality")) {
          try {
            const result = await calculate(equation);
            setEquation!(result.toString());
            setTimeout(() => setEquation!("0"), 1000);
          } catch (error) {
            console.error("Error in calculation:", error);
            setEquation!("Error");
          }
        }
      }
    }
  };

  return (
    <div className="calculator">
      <Equation />
      <div className="buttons" onClick={interact}>
        {buttons.map((button: ButtonProps) => (
          <Button className={button.className} value={button.value} key={Math.random()} />
        ))}
      </div>
    </div>
  );
};
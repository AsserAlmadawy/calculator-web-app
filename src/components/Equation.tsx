"use client";

import React, { useContext, Context } from "react";
import { AppContext } from "@/context/context";
import type { StateValues } from "@/context/context";
import "@/styles/Equation.css";

export const Equation: React.FC = () => {
  const { equation } = useContext<StateValues>(AppContext);

  return (
    <div className="equation">
      <p>{equation}</p>
    </div>
  );
};
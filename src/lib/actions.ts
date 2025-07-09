type Result = string | number;

export const calculate = async (equation: string): Promise<Result> => {
  try {
    const evaluated = eval(equation);

    if (!isFinite(evaluated)) return "Error";
    if (typeof evaluated !== "number") return "Error";

    const rounded = parseFloat(evaluated.toFixed(10));

    return rounded;
  } catch {
    return "Error";
  }
};
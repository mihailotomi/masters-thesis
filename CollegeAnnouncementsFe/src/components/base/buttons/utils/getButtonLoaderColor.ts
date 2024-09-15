import { ButtonColors } from "../button.types";

export function getButtonLoaderColor(variant: string | undefined): ButtonColors {
  let color = "white" as ButtonColors;

  if (variant) {
    if (variant.includes("outline-")) {
      [, color] = variant.split("outline-") as [string, ButtonColors];
    } else if (variant === "dark" || variant === "black") {
      color = "white" as ButtonColors;
    }
  }

  return color;
}

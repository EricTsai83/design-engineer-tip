import React from "react";
import { LoadingSpinnerIcon } from "./loading-spinner-icon.tsx";

type LoadingSpinnerProps = {
  speed: "slow" | "medium" | "fast";
};

export default function LoadingSpinner({ speed }: LoadingSpinnerProps) {
  const animationClass =
    speed === "slow"
      ? "animate-[spin_2s_linear_infinite]"
      : speed === "fast"
        ? "animate-[spin_0.5s_linear_infinite]"
        : "animate-spin";

  return <LoadingSpinnerIcon className={animationClass} />;
}

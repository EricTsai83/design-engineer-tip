import React from "react";
import { BaseList } from "./base-list.tsx";

type ListProps = {
  variant: "appropriate" | "excessive";
};

export default function List({ variant }: ListProps) {
  const isExcessive = variant === "excessive";

  return (
    <BaseList
      title={isExcessive ? "過度動畫" : "適當動畫"}
      getListItemClassName={() =>
        isExcessive
          ? "group origin-left cursor-pointer flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-blue-500  text-white shadow-md shadow-blue-500/20 transition-all duration-300 ease-out hover:scale-x-110 hover:shadow-lg hover:shadow-blue-500/30"
          : "group flex cursor-pointer items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-blue-500  text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30"
      }
      getDeleteButtonClassName={() =>
        isExcessive
          ? "flex h-8 w-8 flex-shrink-0 translate-x-2 items-center justify-center rounded-lg opacity-0 transition-all delay-100 duration-300 hover:bg-white/20 group-hover:translate-x-0 group-hover:opacity-100"
          : "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg opacity-0 transition-all duration-200 hover:bg-white/20 group-hover:opacity-100"
      }
      useTransitionDelay={isExcessive}
    />
  );
}

import React, { Children } from "react";

interface IGrid {
  children?: JSX.Element | any;
}
function Grid({ children }: IGrid) {
  return <section className="grid grid-cols-12 w-full max-w-[1280px] gap-3">{children}</section>;
}

export default Grid;

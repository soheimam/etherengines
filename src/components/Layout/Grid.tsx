import React, { Children } from "react";

interface IGrid {
  children?: JSX.Element | any;
}
function Grid({ children }: IGrid) {
  return <section className="grid grid-cols-11 w-full">{children}</section>;
}

export default Grid;

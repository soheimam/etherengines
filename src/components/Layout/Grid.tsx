import React, { Children } from "react";

interface IGrid {
  children?: React.ReactNode;
}
function Grid({ children }: IGrid) {
  return <section className="grid grid-cols-12">{children}</section>;
}

export default Grid;

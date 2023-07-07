import React, { Children } from "react";

interface IGrid {
  children?: JSX.Element;
}
function Grid({ children }: IGrid) {
  return <section className="grid cols-12">{children}</section>;
}

export default Grid;

import React, { Children } from "react";

interface IGrid {
  children?: JSX.Element | any;
}
function Grid({ children }: IGrid) {
  return (
    <section className="grid grid-cols-12 grid-rows-12  gap-4">
      {children}
    </section>
  );
}

export default Grid;

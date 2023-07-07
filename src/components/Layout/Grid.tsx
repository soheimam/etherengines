import React, { Children } from "react";

function Grid({ Children }) {
  return <section className="grid cols-12">{Children}</section>;
}

export default Grid;

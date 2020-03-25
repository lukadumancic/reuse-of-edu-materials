import React from "react";
import PresentationScreenGrid from "../components/PresentationScreenGrid";

const Presentation = () => {
  return (
    <PresentationScreenGrid
      items={[]}
      onLayoutChange={(p: any) => {
        console.log(p);
      }}
    />
  );
};

export default Presentation;

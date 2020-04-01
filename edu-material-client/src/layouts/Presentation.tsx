import React from "react";
import PresentationScreenGrid from "../components/PresentationScreenGrid";
import { useSelector } from "react-redux";
import { selectedPresentation } from "../selectors";

const Presentation = () => {
  const currentPresentation = useSelector(selectedPresentation);
  return (
    <PresentationScreenGrid
      items={currentPresentation.screens}
      onLayoutChange={(p: any) => {
        console.log(p);
      }}
    />
  );
};

export default Presentation;

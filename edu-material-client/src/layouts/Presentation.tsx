import React, { useEffect } from "react";
import PresentationScreenGrid from "../components/PresentationScreenGrid";
import { useSelector } from "react-redux";
import { selectedPresentation } from "../selectors";
import Dropzone from "../components/Dropzone";
import { useHistory } from "react-router-dom";

const Presentation = () => {
  const currentPresentation = useSelector(selectedPresentation);
  const history = useHistory();
  useEffect(() => {
    if (!currentPresentation) {
      history.push("/");
    }
  }, [currentPresentation]);

  if (!currentPresentation) {
    return <div />;
  }
  return (
    <>
      <Dropzone
        presentationId={currentPresentation.id}
        presentationName={currentPresentation.title}
      />
      <PresentationScreenGrid
        items={currentPresentation.screens}
        onLayoutChange={(p: any) => {
          console.log(p);
        }}
      />
    </>
  );
};

export default Presentation;

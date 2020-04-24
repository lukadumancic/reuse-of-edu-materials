import React, { useEffect } from "react";
import PresentationScreenGrid from "../components/PresentationScreenGrid";
import { useSelector } from "react-redux";
import { presentationsSelector } from "../selectors";
import Dropzone from "../components/Dropzone";
import { useHistory } from "react-router-dom";

const Presentation = () => {
  const presentations = useSelector(presentationsSelector);
  const currentPresentation =
    presentations.presentations[presentations.selectedPresentationIndex];
  const history = useHistory();
  useEffect(() => {
    if (!currentPresentation) {
      history.push("/");
    }
  }, [currentPresentation]);

  useEffect(() => {
    console.log(currentPresentation.screens);
  }, [currentPresentation.screens]);

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
        presentationName={currentPresentation.title}
        items={currentPresentation.screens}
        onLayoutChange={(p: any) => {
          console.log(p);
        }}
      />
    </>
  );
};

export default Presentation;

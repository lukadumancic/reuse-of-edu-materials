import React, { useEffect, useState } from "react";
import PresentationScreenGrid from "../components/PresentationScreenGrid";
import { useSelector } from "react-redux";
import { presentationsSelector } from "../selectors";
import Dropzone from "../components/Dropzone";
import { useHistory } from "react-router-dom";

const Presentation = () => {
  const [order, setOrder] = useState<number[]>([]);
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
    setOrder(
      Array.from({ length: currentPresentation.screens.length }).map(
        (_v, i) => i
      )
    );
  }, [currentPresentation.screens]);

  const onReorder = (layout: any) => {
    const newOrder = layout
      .sort((a: any, b: any) => {
        if (a.y === b.y) {
          return a.x - b.x;
        }
        return a.y - b.y;
      })
      .map((l: any) => parseInt(l.i));
    setOrder(newOrder);
  };

  if (!currentPresentation) {
    return <div />;
  }
  return (
    <>
      <Dropzone
        presentationId={currentPresentation.id}
        presentationName={currentPresentation.title}
        order={order}
      />
      <PresentationScreenGrid
        presentationName={currentPresentation.title}
        items={currentPresentation.screens}
        onLayoutChange={onReorder}
      />
    </>
  );
};

export default Presentation;

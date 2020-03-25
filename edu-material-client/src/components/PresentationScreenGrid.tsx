import React, { useLayoutEffect, useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const PresentationScreenGrid = (
  props: any = {
    className: "layout",
    items: [1, 2, 3],
    rowHeight: 30,
    onLayoutChange: function(layout: any) {},
    cols: 12,
  }
) => {
  const [width, height] = useWindowSize();
  const generateDOM = () => {
    return props.items.map((v: any, i: number) => {
      return (
        <div key={i}>
          <img
            draggable="false"
            className="screen-image unselectable"
            src="http://localhost:8080/2020-03-20T18:18:38.990Z.png"
            alt=""
          />
        </div>
      );
    });
  };

  useEffect(() => {
    setLayout(generateLayout());
  }, [width, height]);

  const generateLayout = () => {
    const screensInRow = Math.min(Math.round(width / 400), 4) || 4;
    const screenWidth = Math.floor(12 / screensInRow);
    const screenHeight = Math.round(width / 12 * screenWidth * 0.7 / 150);
    console.log({ screensInRow, screenWidth, screenHeight });
    return props.items.map((item: any, i: number) => {
      return {
        x: (i % 4) * screenWidth,
        y: Math.floor(i / screensInRow) * screenHeight,
        w: screenWidth,
        h: screenHeight,
        i: i.toString()
      };
    });
  };

  const onLayoutChange = (layout: any) => {
    props.onLayoutChange(layout);
  };

  const [layout, setLayout] = useState(generateLayout());

  return (
    <ReactGridLayout layout={layout} onLayoutChange={onLayoutChange} {...props} verticalCompact={false}>
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default PresentationScreenGrid;

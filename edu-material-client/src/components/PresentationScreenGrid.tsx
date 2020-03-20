import React, { useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const PresentationScreenGrid = (
  props = {
    className: "layout",
    items: [1, 2, 3],
    rowHeight: 30,
    onLayoutChange: function(layout: any) {},
    cols: 12
  }
) => {
  const generateDOM = () => {
    return (props.items || [1, 2, 3]).map((_v, i) => {
      return (
        <div key={i}>
          <img
            src="http://localhost:8080/2020-03-20T18:18:38.990Z.png"
            alt="new"
          />
        </div>
      );
    });
  };

  const generateLayout = () => {
    return (props.items || [1, 2, 3]).map((item, i) => {
      const y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  };

  const onLayoutChange = (layout: any) => {
    //props.onLayoutChange(layout);
  };

  const [layout] = useState(generateLayout());

  return (
    <ReactGridLayout layout={layout} onLayoutChange={onLayoutChange} {...props}>
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default PresentationScreenGrid;

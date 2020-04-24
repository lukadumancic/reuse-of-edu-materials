import React, { useLayoutEffect, useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import config from "../config";
import RoundButton from "./RoundButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteScreen as deleteScreenAction } from "../actions";

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

async function deleteScreen(
  presentationName: string,
  screenIndex: number,
  dispatch: any
) {
  const res3 = await axios.post(
    config.restApiHostname +
      `/presentation/edit?presentationName=${presentationName}&screenIndex=${screenIndex}`
  );
  if (res3.status === 200) {
    dispatch(deleteScreenAction(screenIndex));
    return;
  }
}

const PresentationScreenGrid = (
  props: any = {
    presentationName: "",
    className: "layout",
    items: [1, 2, 3],
    rowHeight: 30,
    currentBreakpoint: "lg",
    mounted: false,
    onLayoutChange: function (layout: any) {},
    cols: 12,
  }
) => {
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  const generateDOM = () => {
    return props.items.map((v: any, i: number) => {
      return (
        <div key={i}>
          <RoundButton
            className="tool-button"
            onClick={() => {
              deleteScreen(props.presentationName, i, dispatch);
            }}
          >
            x
          </RoundButton>
          <img
            draggable="false"
            className="screen-image unselectable"
            src={config.restApiHostname + "/file/" + v.src}
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
    const screenHeight = Math.round(((width / 12) * screenWidth * 0.7) / 150);
    return props.items.map((item: any, i: number) => {
      return {
        x: (i % 4) * screenWidth,
        y: Math.floor(i / screensInRow) * screenHeight,
        w: screenWidth,
        h: screenHeight,
        i: i.toString(),
      };
    });
  };

  const onLayoutChange = (layout: any) => {
    props.onLayoutChange(layout);
  };

  const [layout, setLayout] = useState(generateLayout());

  useEffect(() => {
    setLayout(generateLayout());
  }, [props.items.length]);

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={onLayoutChange}
      {...props}
      verticalCompact={true}
      preventCollision={false}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default PresentationScreenGrid;

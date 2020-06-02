import React, { useLayoutEffect, useEffect, useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import config from "../config";
import RoundButton from "./RoundButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteScreen as deleteScreenAction } from "../actions";
import Modal from "react-modal";
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

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

async function editScreen(
  presentationName: string,
  screenIndex: number,
  setSlideData: any
) {
  const res = await axios.get(
    config.restApiHostname +
      `/presentation/slide?presentationName=${presentationName}&screenIndex=${screenIndex}`
  );
  if (res.data) {
    setSlideData(JSON.parse(JSON.stringify(res.data)));
  }
}

async function saveScreen(
  presentationName: string,
  screenIndex: number,
  slideData: any
) {
  const res = await axios.post(
    config.restApiHostname +
      `/presentation/slide?presentationName=${presentationName}&screenIndex=${screenIndex}`,
    slideData
  );
  if (res.status === 200) {
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
    refresh: () => {}
  }
) => {
  const dispatch = useDispatch();
  const [width, height] = useWindowSize();
  const [slideData, setSlideData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(-1);

  React.useEffect(() => {
    if (slideData) {
      setIsModalOpen(true);
    }
  }, [slideData]);

  const generateDOM = () => {
    return props.items.map((v: any, i: number) => {
      return (
        <div key={i}>
          <RoundButton
            className="tool-button delete"
            onClick={() => {
              deleteScreen(props.presentationName, i, dispatch);
            }}
          >
            x
          </RoundButton>
          <RoundButton
            className="tool-button edit"
            onClick={() => {
              setIndex(i);
              editScreen(props.presentationName, i, setSlideData);
            }}
          >
            🎨
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

  const handleChange = (data: any) => {
    setSlideData(data);
  };

  return (
    <>
      <ReactGridLayout
        layout={layout}
        onLayoutChange={onLayoutChange}
        {...props}
        verticalCompact={true}
        preventCollision={false}
      >
        {generateDOM()}
      </ReactGridLayout>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        contentLabel="Add new presentation"
      >
        <form className="add-presentation">
          <Editor
              value={slideData}
              onChange={handleChange}
          />
          <br />
          <button
            type="submit"
            onClick={async () => {
              saveScreen(props.presentationName, index, slideData);
              props.refresh(index, index + 1);
              setIsModalOpen(false);
            }}
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default PresentationScreenGrid;

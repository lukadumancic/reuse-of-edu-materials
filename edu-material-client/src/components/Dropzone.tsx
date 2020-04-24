import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import config from "../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addScreens } from "../actions";

const Dropzone = (props: {
  presentationId: string;
  presentationName: string;
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(async (acceptedFiles) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    var formData = new FormData();
    formData.append("file", acceptedFiles[acceptedFiles.length - 1]);
    const res1 = await axios.post(config.restApiHostname + "/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res1.status === 200) {
      // TODO this is bad solution
      setTimeout(async () => {
        const res2 = await axios.post(
          config.restApiHostname +
            `/presentation/file?fileName=${res1.data}&presentationName=${props.presentationName}`
        );
        if (res2.status === 200) {
          const res3 = await axios.get(
            config.restApiHostname +
              `/presentation?presentationName=${props.presentationName}`
          );
          if (res3.status === 200) {
            dispatch(
              addScreens(
                Object.values(res3.data).map((src) => ({
                  src: src as string,
                }))
              )
            );
          }
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }, 5000);
    } else {
      setIsLoading(false);
    }
  }, []);

  const refresh = async () => {
    const res3 = await axios.get(
      config.restApiHostname +
        `/presentation?presentationName=${props.presentationName}`
    );
    if (res3.status === 200) {
      dispatch(
        addScreens(
          Object.values(res3.data).map((src) => ({
            src: src as string,
          }))
        )
      );
    }
  };

  const download = async () => {
    await axios.get(
      config.restApiHostname +
        `/presentation/h5p?presentationName=${props.presentationName}`
    );
  };

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    minSize: 0,
  });

  return (
    <div>
      <div className={"dropzone-container " + (isDragActive ? "active" : "")}>
        <div {...getRootProps()} style={{ height: "100%" }}>
          <input {...getInputProps()} />
          <p>Drag .h5p file here {isLoading ? "Loading... please wait" : ""}</p>
        </div>
      </div>
      <button onClick={refresh}>Refresh</button>
      <button onClick={download}>Download</button>
    </div>
  );
};

export default Dropzone;

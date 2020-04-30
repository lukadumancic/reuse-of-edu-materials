import React, { useCallback, useState, forwardRef, useImperativeHandle } from "react";
import { useDropzone } from "react-dropzone";
import config from "../config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addScreens } from "../actions";

const Dropzone = forwardRef((props: {
  presentationId: string;
  presentationName: string;
  order: number[];
}, ref) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    refresh,
  }));

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
                Object.values(res3.data).map((src, index) => ({
                  src: src as string,
                  index
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

  const refresh = async (from = 0, to = -1) => {
    const res3 = await axios.get(
      config.restApiHostname +
        `/presentation?presentationName=${props.presentationName}&fromSlide=${from}&toSlide=${to}`
    );
    if (res3.status === 200) {
      dispatch(
        addScreens(
          Object.values(res3.data).map((src, i) => ({
            src: src as string,
            index: from + i
          }))
        )
      );
    }
  };

  const download = async () => {
    axios({
      url:
        config.restApiHostname +
        `/presentation/h5p?presentationName=${props.presentationName}&order=${props.order.join(',')}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${props.presentationName}.h5p`);
      document.body.appendChild(link);
      link.click();
    });
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
      <button onClick={() => refresh()}>Refresh</button>
      <button onClick={download}>Download</button>
    </div>
  );
});

export default Dropzone;

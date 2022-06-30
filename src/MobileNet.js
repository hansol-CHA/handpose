import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as mobilenet from "@tensorflow-models/mobilenet";

function MobileNet () {
  const webcamRef = useRef(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [input, setInput] = useState({
    width: 224,
    height: 224,
  })
  const STOP_DATA_GATHER = -1;
  const CLASS_NAME = [];

  const loadModel = async () => {
    setIsModelLoading(true);

    try {
      const model = await mobilenet.load();
      setModel(model);
    } catch (error) {
      console.log(error);
    }
    setIsModelLoading(false);
  }

  const enableCam = () => {}

  const trainAndPredict = () => {}

  const reset = () => {}

  const gatherDataForClass = (e) => {
    const className = e.target.attributes.getNamedItem("data-name").value;
    console.log(className)
    CLASS_NAME.push(className);
  } 

  useEffect(() => {
    loadModel();
  }, []);



  return (
    <div>
      <Webcam 
      ref={webcamRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 640,
        height: 480,
      }} />
      <button id="enableCam">Enable Webcam</button>
      <button className="dataCollection" data-1hot="0" data-name="Class 1" onClick={gatherDataForClass}>Class 1 data</button>
      <button className="dataCollection" data-1hot="1" data-name="Class 2" onClick={gatherDataForClass}>Class 2 data</button>
      <button id="train">Train/predict</button>
      <button id="reset">reset</button>
    </div>
    )
}
export default MobileNet;
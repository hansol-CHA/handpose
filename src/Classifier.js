import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";

function Classifier () {
  const webcamRef = useRef(null);
  const buttonA = useRef(null);
  const buttonB = useRef(null);
  const buttonC = useRef(null);
  const classRef = useRef(null);

  const [inputs, setInputs] = useState({
    A: "",
    B: "",
    C: "",
  })

  const { A, B, C } = inputs;
  console.log("A", A)
  console.log("B", B)
  console.log("C", C)

  const classifier = knnClassifier.create();
  let net;

  const runClasssifier = async () => {
    net = await mobilenet.load();

    const webcam = await tf.data.webcam(webcamRef.current, {
      resizeHeight: 480,
      resizeWidth: 640,
    });
    console.log(webcam);

    const addExample = async (classId) => {
      const img = await webcam.capture();

      const activation = net.infer(img, "conv_preds");

      classifier.addExample(activation, classId);

      img.dispose(); // 메모리 삭제
    }

    buttonA.current.addEventListener("click", () => addExample(A));
    buttonB.current.addEventListener("click", () => addExample(B));
    buttonC.current.addEventListener("click", () => addExample(C));

    while (true) {
      if (classifier.getNumClasses() > 0) {
        const img = await webcam.capture();

        const activation = net.infer(img, "conv_preds");
        const result = await classifier.predictClass(activation);
        console.log(result)

        if (classRef.current) {
          classRef.current.innerText = `predictions: ${result.label} probability: ${result.confidences[result.label]}`
        }

        img.dispose();
      }

      await tf.nextFrame();
    }
  }

  useEffect(() => {
    if (webcamRef.current) {
      runClasssifier();
    }
  }, [webcamRef])

  const handleInputsChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  return (
    <div>
      <div ref={classRef}></div>
      <video 
        autoPlay
        playsInline
        muted={true}
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
        }}
      />
      {/* <Webcam 
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
      }} /> */}
      <div>
          <input name="A" onChange={handleInputsChange} value={A} />
          <button ref={buttonA}>add A</button>
      </div>
      <div>
          <input name="B" onChange={handleInputsChange} value={B} />
          <button ref={buttonB}>add B</button>
      </div>
      <div>
          <input name="C" onChange={handleInputsChange} value={C} />
          <button ref={buttonC}>add C</button>
      </div>
      <div>
        <button>export</button>
      </div>
      
    </div>
    )
}
export default Classifier;
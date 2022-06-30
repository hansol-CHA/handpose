import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier'
import Webcam from 'react-webcam';
import React, { useRef, useEffect } from 'react';

function Classifier() {
  const webcamRef = useRef(null);
  const camera = useRef();
  const figures = useRef();

  const btnA = useRef();
  const btnB = useRef();
  const btnC = useRef();
  const btnExport = useRef();

  let net;
  /**
   * @type {knnClassifier}
   */
  const classifier = knnClassifier.create();
  const webcamElement = camera.current;
  console.log('Loading mobilenet..');

  const run = async () => {
    console.log("run 실행")
    net = await mobilenet.load();
    const webcam = await tf.data.webcam(webcamRef.current.video, {
      resizeHeight: 224,
      resizeWidth: 224
    });
    // const webcam = await tf.data.webcam(webcamElement, {
    //   resizeHeight: 224,
    //   resizeWidth: 224
    // });

      const addExample = async classId => {
      // Capture an image from the web camera.
      const img = await webcam.capture();

      // Get the intermediate activation of MobileNet 'conv_preds' and pass that
      // to the KNN classifier.
      const activation = net.infer(img, true);

      // Pass the intermediate activation to the classifier.
      classifier.addExample(activation, classId);

      // Dispose the tensor to release the memory.
      img.dispose();
    };
    const exportProc = () => {

      let dataset = classifier.getClassifierDataset()
      var datasetObj = {}
      Object.keys(dataset).forEach(async (key) => {
        let data = await dataset[key].dataSync();
        // use Array.from() so when JSON.stringify() it covert to an array string e.g [0.1,-0.2...] 
        // instead of object e.g {0:"0.1", 1:"-0.2"...}
        datasetObj[key] = Array.from(data);
      });
      let jsonStr = JSON.stringify(datasetObj)
      //can be change to other source
      let downloader = document.createElement("a");
      downloader.download = "model.json";
      downloader.href = "data:text/text;charset=utf-8," + encodeURIComponent(jsonStr);
      document.body.appendChild(downloader);
      downloader.click();
      downloader.remove();
      // localStorage.setItem("myData", jsonStr);
    }

    btnA.current.addEventListener('click', () => addExample('cup'));
    btnB.current.addEventListener('click', () => addExample('bottle'));
    btnC.current.addEventListener('click', () => addExample('phone'));
    btnExport.current.addEventListener('click', () => exportProc());

    while (true) {
      if (classifier.getNumClasses() > 0) {
        const img = await webcam.capture();
        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(img, 'conv_preds');
        // Get the most likely class and confidence from the classifier module.
        const result = await classifier.predictClass(activation);

        //const result = await net.classify(img);

        if (figures.current) {
          //const classes = ['A', 'B', 'C'];
          figures.current.innerText = `
        prediction: ${result.label} \n
        probability: ${result.confidences[result.label]}
        `;
          //figures.current.innerText = `Prediction: ${ result[0].className } \n probability: ${ result[0].probability } `;
        }
        img.dispose();
      }
      await tf.nextFrame();
    }
  };

  useEffect(() => {
    console.log("video", camera.current)
    console.log("reactWebcam", webcamRef.current)

    if (webcamRef.current) { run(); }
  }, [webcamRef]);

  return (
    <div className="App">
      <div ref={figures}></div>

      {/* <video autoPlay playsInline muted={true}
        ref={camera}
        width="640" height="480"></video> */}

      <Webcam ref={webcamRef} width="640" height="480" />

      <div>
        <button ref={btnA}> add cup</button>
        <button ref={btnB}> add Bottle</button>
        <button ref={btnC}> add phone</button>
      </div>
      <div>
        export..
        <button ref={btnExport}> export</button>
      </div>
    </div>
  );
}

export default Classifier;

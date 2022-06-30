import './App.css';
import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
// import * as fp from "fingerpose";
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

import GestureEstimator from './Fingerpose/GestureEstimator';
import Gestures from "./Fingerpose/Gestures/index"
import { drawHand } from "./utility"

function Handpose() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const isIOS = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
  }

  const isMobile = () => {
    return isAndroid() || isIOS();
  }

  const createDetector = async () => {
    const hands = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs',
      modelType: 'lite',
      maxHands: 2,
    }

    return handPoseDetection.createDetector(hands, detectorConfig);
  }

  const setUpCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("media is not avaiable")
    }

    const $size = { width: 640, height: 480 };
    const $mobile_size = { width: 360, height: 270 };

    const videoConfig = {
      "audio": false,
      "video": {
        facingMode: "user",
        width: isMobile() ? $mobile_size.width  : $size.width,
        height: isMobile() ? $mobile_size.height : $size.height,
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    // const camera = new Camera();
    // camera.video.srcObject = stream;

    // await new Promise((resolve) => {
    //   camera.video.onloadedmetadata = () => {
    //     resolve(video);
    //   }
    // });

    // camera.video.play();

    console.log(webcamRef.current.video)

    webcamRef.current.srcObject = stream;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
  }

  const detection = async (detector) => {

    if (typeof webcamRef.current !== "undefined" &&
    webcamRef.current !== null && webcamRef.current.video.readyState === 4
    ) {
    //   const video = webcamRef.current.video;
    //   const videoWidth = webcamRef.current.video.videoWidth;
    //   const videoHeight = webcamRef.current.video.videoHeight;

    //   webcamRef.current.video.width = videoWidth;
    //   webcamRef.current.video.height = videoHeight;

    //   canvasRef.current.width = videoWidth;
    //   canvasRef.current.height = videoHeight;

    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;    

      const hand = await detector.estimateHands(video);
      console.log("hand", hand)

      if (hand.length > 0) {
          const GE = new GestureEstimator([
              Gestures.VictoryGesture,
              Gestures.ThumbsUpGesture,
              Gestures.giyeok,
          ])

          // const gesture = await GE.estimate(hand[0].keypoints, 8);
          const gesture = await GE.estimate(hand[0].keypoints3D, 8);
          console.log("gesture", gesture);
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  }

  const runHandpose = async () => {
    const detector = await createDetector()

    setInterval(() => {
      detection(detector)
    }, 1000)
  }

  useEffect(() => {
    runHandpose();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* <video 
          ref={webcamRef}
          playsInline
          muted
          autoPlay 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: "auto",
            height: "auto",
          }} /> */}
        <Webcam ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: "auto",
            height: "auto",
          }} />
        <canvas ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: "auto",
            height: "auto",
        }} />
      </header>
    </div>
  );
}

export default Handpose;

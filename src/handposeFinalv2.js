import React, { useRef, useState, useEffect } from "react";

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";

import GestureEstimator from './Fingerpose/GestureEstimator';
import Gestures from "./Fingerpose/Gestures/index"

import { drawHand } from "./utility";

function HandposeFinalv2() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const hands = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs',
      modelType: 'lite',
      maxHands: 2,
    }

    const net = await handPoseDetection.createDetector(hands, detectorConfig);

    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      console.log("net", net)
      const hand = await net.estimateHands(video);
      console.log("hand", hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // if (hand.length > 0) {
      //   const GE = new fp.GestureEstimator([
      //     fp.Gestures.VictoryGesture,
      //     fp.Gestures.ThumbsUpGesture,
      //   ]);
      //   const gesture = await GE.estimate(hand[0].landmarks, 4);
      //   if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
      //     // console.log(gesture.gestures);

      //     const confidence = gesture.gestures.map(
      //       (prediction) => prediction.confidence
      //     );
      //     const maxConfidence = confidence.indexOf(
      //       Math.max.apply(null, confidence)
      //     );
      //     // console.log(gesture.gestures[maxConfidence].name);
      //     setEmoji(gesture.gestures[maxConfidence].name);
      //     console.log(emoji);
      //   }
      // }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default HandposeFinalv2;
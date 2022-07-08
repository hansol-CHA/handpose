import React, { useRef, useState, useEffect } from "react";

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import Webcam from "react-webcam";

import GestureEstimator from './Fingerpose/GestureEstimator';
import Gestures from "./Fingerpose/Gestures/index"

import { drawHand } from "./utility";

function HandposeFinal() {
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

  const $size = { width: 640, height: 480 };
  const $mobile_size = { width: 360, height: 270 };

  const actual_size = {
    width: isMobile() ? $mobile_size.width  : $size.width,
    height: isMobile() ? $mobile_size.height : $size.height,
  }

  const runHandpose = async () => {
    const hands = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs',
      modelType: 'lite',
      maxHands: 2,
    }

    const net = await handPoseDetection.createDetector(hands, detectorConfig);

    await setCamera();

    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const setCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("media is not avaiable")
    }

    const videoConfig = {
      "audio": false,
      "video": {
        facingMode: "user",
        width: actual_size.width,
        height: actual_size.height,
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

    if (webcamRef.current && !webcamRef.current.srcObject) {
      webcamRef.current.srcObject = stream;
      webcamRef.current.play();  
    }
  }

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.readyState === 4
    ) {

      // Set video width
      webcamRef.current.width = actual_size.width;
      webcamRef.current.height = actual_size.height;

      // Set canvas height and width
      canvasRef.current.width = actual_size.width;
      canvasRef.current.height = actual_size.height;

      // Make Detections
      const hand = await net.estimateHands(webcamRef.current);

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
      //     const   = confidence.indexOf(
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

  useEffect(()=>{
    runHandpose()
  },[]);

  return (
    <div className="App">
      <header className="App-header">
      <video ref={webcamRef}
        autoPlay
        muted
        playsInline
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
            width: "auto",
            height: "auto",
          }}
        />
      </header>
    </div>
  );
}

export default HandposeFinal;
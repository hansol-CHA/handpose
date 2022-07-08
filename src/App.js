import './App.css';
import React, { useEffect, useRef } from 'react';
import { Routes, Route } from "react-router-dom"
import Main from './Main';
import Handpose from './Handpose';
import HandposeFinal from './handposeFinal';
import HandposeFinalv2 from './handposeFinalv2';
import MobileNet from "./MobileNet"
import Classifier from './Classifier';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/handpose" element={<HandposeFinal />} /> */}
      <Route path="/handpose" element={<HandposeFinalv2 />} />
      <Route path="/mobilenet" element={<MobileNet />} />
      <Route path="/classifier" element={<Classifier />} />
    </Routes>
  )
}

export default App;

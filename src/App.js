import './App.css';
import React, { useEffect, useRef } from 'react';
import { Routes, Route } from "react-router-dom"
import Main from './Main';
import Handpose from './Handpose';
import MobileNet from "./MobileNet"
import Classifier from './Classifier';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/handpose" element={<Handpose />} />
      <Route path="/mobilenet" element={<MobileNet />} />
      <Route path="/classifier" element={<Classifier />} />
    </Routes>
  )
}

export default App;

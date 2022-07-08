import { Handedness, Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const hello = new GestureDescription('hello');

// thumb:
hello.addDirection(Handedness.Left, Finger.Thumb, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Left, Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
hello.addCurl(Handedness.Left, Finger.Index, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Left, Finger.Index, FingerCurl.HalfCurl, 0.8);
hello.addDirection(Handedness.Left, Finger.Index, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Left, Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

// middle:
hello.addCurl(Handedness.Left, Finger.Middle, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Left, Finger.Middle, FingerCurl.HalfCurl, 0.8);
hello.addDirection(Handedness.Left, Finger.Middle, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Left, Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
hello.addCurl(Handedness.Left, Finger.Ring, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Left, Finger.Ring, FingerCurl.HalfCurl, 0.9);
hello.addDirection(Handedness.Left, Finger.Ring, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Left, Finger.Ring, FingerDirection.DiagonalUpRight, 0.9);

// pinky:
hello.addCurl(Handedness.Left, Finger.Pinky, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Left, Finger.Pinky, FingerCurl.HalfCurl, 0.9);
hello.addDirection(Handedness.Left, Finger.Pinky, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Left, Finger.Pinky, FingerDirection.DiagonalUpLeft, 0.9);

// thumb:
hello.addDirection(Handedness.Right, Finger.Thumb, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Right, Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// index:
hello.addCurl(Handedness.Right, Finger.Index, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Right, Finger.Index, FingerCurl.HalfCurl, 0.8);
hello.addDirection(Handedness.Right, Finger.Index, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Right, Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);

// middle:
hello.addCurl(Handedness.Right, Finger.Middle, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Right, Finger.Middle, FingerCurl.HalfCurl, 0.8);
hello.addDirection(Handedness.Right, Finger.Middle, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Right, Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
hello.addCurl(Handedness.Right, Finger.Ring, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Right, Finger.Ring, FingerCurl.HalfCurl, 0.9);
hello.addDirection(Handedness.Right, Finger.Ring, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Right, Finger.Ring, FingerDirection.DiagonalUpRight, 0.9);

// pinky:
hello.addCurl(Handedness.Right, Finger.Pinky, FingerCurl.FullCurl, 1.0);
hello.addCurl(Handedness.Right, Finger.Pinky, FingerCurl.HalfCurl, 0.9);
hello.addDirection(Handedness.Right, Finger.Pinky, FingerDirection.VerticalUp, 1.0);
hello.addDirection(Handedness.Right, Finger.Pinky, FingerDirection.DiagonalUpRight, 0.9);

export default hello;
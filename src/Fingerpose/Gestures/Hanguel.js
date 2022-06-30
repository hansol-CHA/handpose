import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';

const giyeok = new GestureDescription("giyeok");

giyeok.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
giyeok.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.8);
giyeok.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.8);
giyeok.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.8);

giyeok.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
giyeok.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.7);
giyeok.addDirection(Finger.Index, FingerDirection.VerticalDown, 0.8);

giyeok.addCurl(Finger.Middle, FingerCurl.FullCurl, 1);

giyeok.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);

giyeok.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);


export { giyeok }
const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.keypoints;
      const handedness = prediction.handedness;
      const fingers = Object.keys(fingerLookupIndices);

      for (let i = 0; i < fingers.length; i++) {
        const finger = fingers[i];
        const points = fingerLookupIndices[finger].map(idx => keypoints[idx]);

        const region = new Path2D();
        region.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          const point = points[i];
          region.lineTo(point.x, point.y);

          ctx.strokeStyle = 'White';
          ctx.lineWidth = 2;
          ctx.stroke(region)
        }
      }

      for (let i = 0; i < keypoints.length; i++) {
        const x = keypoints[i].x
        const y = keypoints[i].y

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI)

        ctx.fillStyle = handedness === "Right" ? "indigo" : "Yellow"
        ctx.fill();
      }
    })
  }
}


const COLOR = 'yellow';

function drawPoint(ctx, y, x, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = COLOR;
    ctx.fill();
}

function drawSegment([ay, ax], [by, bx], scale, ctx) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = '10px';
    ctx.strokeStyle = COLOR;
    ctx.stroke();
}

function toTuple({
    y,
    x
}) {
    return [y, x];
}

//export function drawSkeleton(keypoints, minConfidence, ctx,
//    scale = 1) {
//    const adjacentKeyPoints = posenet.
//    getAdjacentKeyPoints(keypoints, minConfidence);
//    adjacentKeyPoints.forEach((keypoints) => {
//        drawSegment(
//            toTuple(keypoints[0].position), toTuple(keypoints[1].position), scale, ctx,
//        );
//    });
//}

//export function drawKeypoints(keypoints, ctx,
//    scale = 1) {
//    for (let i = 0; i < keypoints.length; i += 1) {
//
//        const keypoint = keypoints[i];
//        const x = keypoint[0];
//        const y = keypoint[1];
//        drawPoint(ctx, y * scale, x * scale, 2);
//
//
//    }
//}


export function drawKeypoints(keypoints, points, ctx,
    scale = 1) {
//    const points = [64, 294];

    for (var i in points) {
        const keypoint = keypoints[points[i]];
        const x = keypoint[0];
        const y = keypoint[1];
        drawPoint(ctx, (y) * scale, (x) * scale, 3);

    }
}

export function drawKeyNum(keypoints, ctx,
    scale = 1) {
    for (let i = 0; i < keypoints.length; i += 1) {
        const keypoint = keypoints[i];
        const x = keypoint[0];
        const y = keypoint[1];
        drawNum(ctx, y, x, i);


    }
}

function drawNum(ctx, y, x, i) {
    ctx.beginPath();
    ctx.font =  "20px Arial";
    ctx.fillText(i, x, y);
    ctx.fillStyle = COLOR;
    ctx.fill();
}
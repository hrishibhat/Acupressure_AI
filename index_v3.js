import {
    drawKeypoints,
    drawKeyNum,
} from './draw_facemesh.js';

const SIZE = 500;
let model;
let points = [];
var x = document.getElementsByClassName("buttons");

//const face =  document.getElementById('face');
//var button = document.getElementById('btn1');
async function setupCamera() {

    const video = await document.getElementById('video');

    video.width = SIZE;
    video.height = SIZE;
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: {
                ideal: SIZE
            },
            height: {
                ideal: SIZE
            },
        },
    }).then((stream) => {
        video.srcObject = stream;
    });
                console.log('inside setupcamera');

    return new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(video);
//                video.onloadeddata = () => resolve(video);

    });
}

async function loadVideo() {
        console.log('inside load');

    const video = await setupCamera();
    console.log('done loading');
    video.play();
    return video;
}



async function init() {
        console.log('inside init');

    const video = await loadVideo();
    model = await facemesh.load();

    console.log('leaving init');
    //    console.log(detector);
    detect(video);
}

function detect(video) {
    console.log('inside detect');
    const canvas = document.getElementById('output');
    const ctx = canvas.getContext('2d');
    canvas.width = SIZE;
    canvas.height = SIZE;
    let lastPose;
    const MIN_CONFIDENCE = 0.3;


    async function getPose() {
        for (var i = 0; i < x.length; i++) {
            /*    comment[i].addEventListener('click' , showComment , false ) ; 
             */
            x[i].addEventListener('click', start, false);
            break;
        }
        //        console.log('insidepose');

        const predictions = await model.estimateFaces(video);
        lastPose = predictions;
        //        console.log(predictions.length);
        if (predictions.length > 0 && points.length > 0) {
            for (let i = 0; i < predictions.length; i++) {
                const keypoints = predictions[i].scaledMesh;
                ctx.clearRect(0, 0, SIZE, SIZE);
                ctx.save();

                ctx.scale(-1, 1);
                //                    ctx.scale(2,2);
                ctx.translate(-SIZE, 0);


                ctx.drawImage(video, 0, 0, SIZE, SIZE);

                //        console.log(pose[0].keypoints);
                drawKeypoints(keypoints, points, ctx);
                ctx.restore();
                //                            drawKeyNum(keypoints, ctx);


                //        drawSkeleton(pose[0].keypoints, MIN_CONFIDENCE, ctx);
                // Log facial keypoints.
                //                for (let i = 0; i < keypoints.length; i++) {
                //                    const [x, y, z] = keypoints[i];
                //
                //                    console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
                //                }
                //            }
                //    
            }

            requestAnimationFrame(getPose);

        } else {
            ctx.clearRect(0, 0, SIZE, SIZE);
            ctx.save();

            ctx.scale(-1, 1);
            ctx.translate(-SIZE, 0);
            ctx.drawImage(video, 0, 0, SIZE, SIZE);
            ctx.restore();
            requestAnimationFrame(getPose);

        }
    }

    getPose();

}
//$('#btn1').on("click", function() {
//    console.log('Clicked');
//    points = [5];
//
//init();
//});
var btn1 = $("#btn1"),
    btn2 = $("#btn2"),
    btn3 = $("#btn3");

function start() {
    $('#btn1, #btn2, #btn3').click(function () {
        console.log(this.id);

        if (this.id == 'btn1') {
            console.log("b1");
            points = [9];
        }
        if (this.id == 'btn2') {

            console.log("b2");

            points = [64, 294];
        }
        if (this.id == 'btn3') {

            console.log("b3   ");

            points = [206, 426];
        }
        init();
    });
}
start();
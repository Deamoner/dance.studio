import React from 'react';
import { useMemo, useState, setState, useEffect, useRef } from "react"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import Zoom from '@material-ui/core/Zoom';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactPlayer from 'react-player'
import fileDownload from 'js-file-download'
import ReactStoreIndicator from 'react-score-indicator'
import Timer from 'react-compound-timer'

import PoseNet from "react-posenet"

import * as posenet from '@tensorflow-models/posenet';

import { FaReact as ReactIcon } from 'react-icons/fa';
import { poseSimilarity } from 'posenet-similarity';
import Meta from 'components/Meta';


import useStyles from './styles';


function drawSegment(ctx, [ay, ax], [by, bx], color, scale) {
      ctx.beginPath();
      ctx.moveTo(ax * scale, ay * scale);
      ctx.lineTo(bx * scale, by * scale);
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.stroke();
    }

async function drawSkeleton(ctx, keypoints) {
      const net = await posenet.load();
      const adjacentKeyPoints = await posenet.getAdjacentKeyPoints(
        keypoints,
        this.minConfidence
      );
      adjacentKeyPoints.forEach(keypoints => {
        drawSegment(ctx,
          this.toTuple(keypoints[0].position),
          this.toTuple(keypoints[1].position),
          "#FF0000",
          1
        );
      });
    }

function Welcome() {
//export default class Welcome extends Component {
  const [open, setOpen] = React.useState(true);

  const [count, setCount] = useState(0)
  const [steppingState, setsteppingState] = useState(false)
  const [dancestep, setDancestep] = useState(0)
  const [pointalert, setPointAlert] = useState(0)
  const [points, setPoints] = useState(0)
  const [posesaver, setPosesaver] = useState(0)
  const canvasref = useRef(null)
  let stepping = false;


  const imitatearray = [
    "./images/Y.jpg",
    "./images/M.jpg",
    "./images/C.jpg",
    "./images/A.jpg",
    "./images/Y.jpg",
    "./images/M.jpg",
    "./images/C.jpg",
    "./images/A.jpg",
    "./images/Y.jpg",
    "./images/M.jpg",
    "./images/C.jpg",
    "./images/A.jpg"
  ];

// functions for state overlay


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    var elements = document.getElementsByClassName("webcamerclass");
    let canvas = elements[0]
    let ctx = canvas.getContext("2d")
    //canvas.fadeTo(3000,0)
    //ctx.globalAlpha = 0.2;
    canvas.style.opacity = "0.4"
    //canvas.style.display="none";

  };




/// Testing preloading images - will need to remove to clean it out
  const imagearray = []
  let newimage = new Image()
  newimage.crossOrigin = ""
  newimage.src = imitatearray[0]
  imagearray.push(newimage)
  let newimage1 = new Image()
  newimage1.crossOrigin = ""
  newimage1.src = imitatearray[1]
  imagearray.push(newimage1)
  let newimage2= new Image()
  newimage2.crossOrigin = ""
  newimage2.src = imitatearray[2]
  imagearray.push(newimage2)
  let newimage3 = new Image()
  newimage3.crossOrigin = ""
  newimage3.src = imitatearray[3]
  imagearray.push(newimage3)

  imagearray.push(newimage)
  imagearray.push(newimage1)
  imagearray.push(newimage2)
  imagearray.push(newimage3)

  // get image for testing funciton
  const input = useMemo(() => {
    const image = new Image()
    image.crossOrigin = ""
      image.src = imitatearray[dancestep]

    return image
  }, [])
  const [step, setStep] = useState(input)
  // Here I need to make a function for
  let pose1 = {}
  let pose2 = {}
  let shown = false;
  let possim = []
  let posesimilarity1 = 0;
  let tempcanvas = 0;



// Reecording things




  //Voice synth
  var available_voices = window.speechSynthesis.getVoices();

	// this will hold an english voice
	var english_voice = '';

	// find voice by language locale "en-US"
	// if not then select the first voice
	for(var i=0; i<available_voices.length; i++) {
		if(available_voices[i].lang === 'en-US') {
			english_voice = available_voices[i];
			break;
		}
	}
	if(english_voice === '')
		english_voice = available_voices[0];
  let utter = new SpeechSynthesisUtterance();
  utter.rate = 1;
	utter.pitch = 0.3;
	utter.text = 'You got it!';
	utter.voice = english_voice;






  const onChange = (e) => {

    if(e[0] && pose1[0]){

      setPosesaver(e[0].keypoints)

      if(e[0].hasOwnProperty("keypoints") && pose1[0].hasOwnProperty("keypoints")) {
        if(pose1[0].keypoints.length > 5 && e[0].keypoints.length > 1){

          /// Basic pose estimation stuff
          posesimilarity1 = poseSimilarity(pose1[0], e[0], { strategy: 'cosineSimilarity' })
          if(isNaN(posesimilarity1) != true) {
            setCount(posesimilarity1*100)
            if(posesimilarity1*100 > 95 && steppingState == false){
              let newdance1 = dancestep + 1;


              setsteppingState( (newdance2) => {

                setDancestep((newdance3) => {

                  setStep(imagearray[newdance1])
                  let ymca = ['Y', 'M', 'C', 'A', 'Y', 'M', 'C', 'A', 'Y', 'M', 'C', 'A']
                  utter.text = ymca[newdance1-1]
                  window.speechSynthesis.speak(utter);
                  setPoints(points + 5);
                  setTimeout(function() { //Start the timer

                      setsteppingState(false)

                  }.bind(this), 500)
                  //setsteppingState(false)

                  return newdance1;
                });

                return {steppingState: true};
              });




            }
          }
          // else posesimularity turned up a nan but enough key points were passed in
          else {
            let smallpercentcalc = 0
            let left = pose1[0].keypoints.length
            let right = e[0].keypoints.length
            smallpercentcalc = ((right / left ) * 50)
            setCount(smallpercentcalc)
          }

        }
        else {
          setCount(0)
          //utter.text = "Move back into the picture, like the example."
          //window.speechSynthesis.speak(utter);
        }
      }
    }
    else {
      setCount(0)
    }
  };
  let state = { progress: 50 }
  return (
    <>
      <Meta
        title="Dance.Studio"
        description="Practice and Compete in fun dance challenges."
      />



        <PoseNet
        style={{ position:"absolute", "zindex":9, left:"0", top:"0", width:"100%", height:"100%" }}
        className={"posecanvasclass"}
        frameRate={2}
        inferenceConfig={{ decodingMethod: "single-person", architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: { width: 257, height: 200 },
        quantBytes: 2 }}
          frameRate={2}
          input={step}
          onEstimate={poses => {
            pose1 = poses;
          }}
        />


        <PoseNet
        frameRate={5}
        style={{ position:"absolute", "zindex":10, left:"0", top:"0", width:"100%", height:"100%" }}
        className={"webcamerclass"}
        inferenceConfig={{ decodingMethod: "single-person", architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: { width: 257, height: 200 },
        quantBytes: 2 }}

        onEstimate={onChange}
        />
        <canvas ref={canvasref} height="500" width="600" className={"otherpose"} style={{ position:"absolute", "zindex":11, left:"0", top:"0", width:"100%", height:"100%" }}></canvas>
        <br/>
        <div> <CircularProgress variant="static" value={count} style={{ position:"absolute", "zindex":20, left:"47.75%", bottom:"75px", width:"75px" }} color="secondary"/> </div>
        <div> <CircularProgress variant="static" value={count} style={{ position:"absolute", "zindex":30, left:"46%", bottom:"75px", width:"100px" }} color="secondary"/> </div>

        <div>
        <Timer
        initialTime={100 * 1000}
        direction="backward"
        timeToUpdate={100}
        checkpoints={[
            {
                time: 0,
                callback: () => alert('countdown finished'),
            }
        ]}
    >  <div style={{ fontFamily: 'Helvetica Neue' }}>

            <div style={{ fontSize: 48, position:"absolute", "zindex":10, left:"90%", top:"10%"}}>
                { points }
            </div>

            <div style={{ fontSize: 32, position:"absolute", "zindex":10, left:"50%", top:"85%" }}>

                <Timer.Seconds />
            </div>


        </div>
    </Timer></div>

    <Snackbar open={steppingState} autoHideDuration={6000} >
  <Alert open={steppingState} severity="success" autoHideDuration={6000}>
    6000 Points!
  </Alert>
</Snackbar>



  <div >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Get Started"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Move your full body into view of the camera to get started!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    <div >
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Great Job"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Final Results! Points 1 Million
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </>
  );
}

export default Welcome;

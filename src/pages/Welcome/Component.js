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
import Tour from 'reactour'
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
  /* Flow States:
    0 - Just arrived
    1 - Person in View and Ready to Start
    2 - Transitioning Animation to 2nd Image
    3 - Start
    4 - Playing
    5 - Paused
    6 - Finished
  */
  const [flowStage, setFlowstage] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const [tourOpen, setTourOpen] = React.useState(false);
  const [startTimer, setStartTimer] = React.useState(false)
  const [resultOpen, setResultOpen] = React.useState(false);
  const [count, setCount] = useState(0)
  const [steppingState, setsteppingState] = useState(false)
  const [dancestep, setDancestep] = useState(0)
  const [pointalert, setPointAlert] = useState(0)
  const [points, setPoints] = useState(0)
  const [posesaver, setPosesaver] = useState(0)
  const canvasref = useRef(null)
  const starttimerref = useRef(null)
  let stepping = false;







  const imitatearray = [
    "./images/Y.jpg",
    "./images/M.jpg",
    "./images/C2.jpg",
    "./images/A.jpg",
    "./images/Y.jpg",
    "./images/M.jpg",
    "./images/C2.jpg",
    "./images/A.jpg",
    "./images/Y.jpg",
    "./images/M.jpg",
    "./images/C2.jpg",
    "./images/A.jpg"
  ];

// functions for state overlay



// Initial Welcome Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    // TODO: Code to start recording of the canvas -
    var elements = document.getElementsByClassName("webcamerclass");
    let canvas = elements[0]
    let ctx = canvas.getContext("2d")
    setStartTimer(true);

    //starttimerref.startImmediately=false;
    //setTourOpen(true)
    //canvas.fadeTo(3000,0)
    //ctx.globalAlpha = 0.2;
    //canvas.style.opacity = "0.4"
    //canvas.style.display="none";

  };




  // Tour Dialog handlers
  const handleTourClose = () => {
    setTourOpen(false)
  }


  const handleStartTimerClose = () => {
    setStartTimer(false);
  }

  const handleResultClose = () => {
    setResultOpen(false)
  }





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





  //Voice synth Section
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





  // Function for posenet Estimate Response
  const onChange = (e) => {

    // don't compute much if no pose data
    if(!pose1[0] || !e[0]){
      return
    }

    //First Flow Stage Check - Reset and Send to Next
    if(flowStage == 0 && open && pose1[0] && e[0]) {
      // if all points match then remove the warning and tell them to start the game
      if(pose1[0].keypoints.length == e[0].keypoints.length){
        handleClose()
        utter.text = "Great. Now Match the picture."
        window.speechSynthesis.speak(utter);
      }

    }

    // Compute Accuracy if pose data not equal
    if(pose1[0].keypoints.length > e[0].keypoints.length){
      let smallpercentcalc = 0
      let left = pose1[0].keypoints.length
      let right = e[0].keypoints.length
      smallpercentcalc = ((right / left ) * 50)
      setCount(smallpercentcalc)
    }

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
              let newpoints = hitPose(posesimilarity1, 2000)
              if(newdance1 >= imagearray.length){
                setResultOpen(true)
                return;
              }
              setsteppingState( (newdance2) => {

                setDancestep((newdance3) => {

                  setStep(imagearray[newdance1])
                  let ymca = ['Y', 'M', 'C', 'A', 'Y', 'M', 'C', 'A', 'Y', 'M', 'C', 'A']
                  utter.text = ymca[newdance1-1]
                  window.speechSynthesis.speak(utter);
                  setPoints(points + newpoints);
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

  const steps = [
  {
    selector: '.points',
    content: 'Points: How fast and accurate you are per pose.',
  },
  {
    selector: '.timer',
    content: 'Time: Time left in this game.',
  },
  {
    selector: '.accuracy',
    content: 'Accuracy: How accurate you are to matching the pose.',
  },

  ]

  // Points functions on hitting the pose
  const hitPose = (accuracy, timeleft) => {
    let maxPoints = 1000;
    let minPoints = 200;
    // points 0 to 5 - will need a multiplier
    let adjaccuracy = (accuracy*100 - 95) / 5;
    //timeleft in ms
    let timepoints =  (1 - ((9500 - timeleft) / 10000));
    let scoreAllowed = (maxPoints - minPoints)
    let randomness = Math.floor((Math.random() * 100) + 1);
    let finalScore = scoreAllowed * ((timepoints * 0.6) + (adjaccuracy * 0.2) + ((randomness/100) * 0.2))
    finalScore = Math.round(finalScore);
    return finalScore
  }



  return (
    <>
      <Meta
        title="Dance.Studio"
        description="Practice and Compete in fun dance challenges."
      />
      <Tour
        steps={steps}
        isOpen={tourOpen}
        onRequestClose={handleTourClose} />


        <PoseNet
        style={{ position:"absolute", "zindex":9, left:"0", top:"0", width:"100%", height:"100%" }}
        className={"posecanvasclass"}
        frameRate={2}
        inferenceConfig={{ decodingMethod: "single-person", architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: { width: 257, height: 200 },
        quantBytes: 2 }}
          input={step}
          onEstimate={poses => {
            pose1 = poses;
          }}
        />


        <PoseNet
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

        <div > <CircularProgress variant="static" value={count} style={{ position:"absolute", "zindex":20, left:"47.75%", bottom:"75px", width:"75px" }} color="secondary"/> </div>
        <div> <CircularProgress variant="static" value={count} style={{ position:"absolute", "zindex":30, left:"46%", bottom:"75px", width:"100px" }} color="secondary"/> </div>

        <div>
        <Timer
        initialTime={60 * 1000}
        direction="backward"
        timeToUpdate={100}
        checkpoints={[
            {
                time: 0,
                callback: () => {
                    setResultOpen(true)
                    return;
                },
            }
        ]}
    >  <div style={{ fontFamily: 'Helvetica Neue' }}>

            <div className="points" style={{ fontSize: 48, position:"absolute", "zindex":10, left:"90%", top:"10%"}}>
                { points }
            </div>

            <div className="timer" style={{ fontSize: 32, position:"absolute", "zindex":10, left:"50%", top:"85%" }}>

                <Timer.Seconds />
            </div>


        </div>
    </Timer></div>

    <Snackbar >
  <Alert open={steppingState} severity="success">
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

    <div>
        <Dialog
          open={resultOpen}
          onClose={handleResultClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Great Job"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Congrats! {points} Points!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleResultClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>


      <div >
          <Dialog
            open={startTimer}
            onClose={handleStartTimerClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Starting in..."}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <Timer

              initialTime={5 * 1000}
              direction="backward"
              timeToUpdate={200}
              startImmediately={true}
              ref={starttimerref}
              checkpoints={[
                  {
                      time: 0,
                      callback: () => {
                        setStartTimer(false)
                        utter.text = "Match the pose"
                        window.speechSynthesis.speak(utter);

                      }},
                      {
                      time: 4000,
                      callback: () => {
                        var elements = document.getElementsByClassName("webcamerclass");
                        let canvas = elements[0]
                        canvas.style.opacity = "0.9"

                      }},
                      {
                      time: 3500,
                      callback: () => {
                        var elements = document.getElementsByClassName("webcamerclass");
                        let canvas = elements[0]
                        canvas.style.opacity = "0.8"

                      }},
                      {
                      time: 3000,
                      callback: () => {
                        utter.text = "3"
                        window.speechSynthesis.speak(utter);
                        var elements = document.getElementsByClassName("webcamerclass");
                        let canvas = elements[0]
                        canvas.style.opacity = "0.7"

                      }},
                      {
                      time: 2500,
                      callback: () => {
                        var elements = document.getElementsByClassName("webcamerclass");
                        let canvas = elements[0]
                        canvas.style.opacity = "0.6"

                      }},
                      {
                      time: 2000,
                      callback: () => {
                        utter.text = "2"
                        window.speechSynthesis.speak(utter);
                        var elements = document.getElementsByClassName("webcamerclass");
                        let canvas = elements[0]
                        canvas.style.opacity = "0.5"

                      }},
                      {
                      time: 1500,
                      callback: () => {
                        var elements = document.getElementsByClassName("webcamerclass");
                        let canvas = elements[0]
                        canvas.style.opacity = "0.4"

                      }},
                      {
                      time: 1000,
                      callback: () => {
                        utter.text = "1"
                        window.speechSynthesis.speak(utter);
                        var elements = document.getElementsByClassName("webcamerclass");
                        let canvas = elements[0]
                        canvas.style.opacity = "0.3"

                      }},

              ]}
          >

              <div >
                  <div className="timer" style={{ fontSize: 48, fontFamily: 'Helvetica Neue' }}>
                      <Timer.Seconds />
                  </div>
              </div>
          </Timer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleStartTimerClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>

    </>
  );
}

export default Welcome;

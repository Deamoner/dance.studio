import React from 'react';
import { useMemo, useState } from "react"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactPlayer from 'react-player'
import ReactStoreIndicator from 'react-score-indicator'
import PoseNet from "react-posenet"
import { FaReact as ReactIcon } from 'react-icons/fa';
import { poseSimilarity } from 'posenet-similarity';
import Meta from 'components/Meta';

import useStyles from './styles';


function Welcome() {
//export default class Welcome extends Component {

  const [count, setCount] = useState(0)
  const [steppingState, setsteppingState] = useState(0)
  const [dancestep, setDancestep] = useState(0)
  let stepping = false;

  const imitatearray = [
    "https://www.yogajournal.com/.image/ar_3:2%2Cc_limit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1400/MTUzODA3NzQzMzE1NDg2NDYy/03-tadasana.jpg",
    "https://www.yogajournal.com/.image/ar_3:2%2Cc_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1400/MTUzODA3NzQzMzE1MTU4Nzgy/cat-cow.gif",
    "https://www.yogajournal.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_1400/MTUzODA3NzQzMzE1MzU1Mzkw/06-side-plank.webp"

  ];

  // get image for testing funciton
  const input = useMemo(() => {
    const image = new Image()
    image.crossOrigin = ""
    //https://imgur.com/gallery/J2RvXlf
    //image.src = "https://i.imgur.com/2IA9xFG.jpg"
    //image.src = "https://i.imgur.com/KjsSnFo.png"
      console.log(dancestep)
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


  const onChange = (e) => {
    if(e[0] && pose1[0] && steppingState == false){
      if(e[0].hasOwnProperty("keypoints") && pose1[0].hasOwnProperty("keypoints")) {
        if(pose1[0].keypoints.length > 5 && e[0].keypoints.length > 5){
          posesimilarity1 = poseSimilarity(pose1[0], e[0], { strategy: 'cosineSimilarity' })
          if(isNaN(posesimilarity1) != true) {
            setCount(posesimilarity1*100)
            if(posesimilarity1*100 > 85 && steppingState == false){




              console.log(dancestep)
              //setsteppingState(true);
              const image = new Image()
              image.crossOrigin = ""
              image.src = imitatearray[dancestep]
              setStep(image)
              setDancestep(dancestep + 1);


            }
          }

        }
        else {
          setCount(0)
        }
      }
    }
    else {
      setCount(0)
    }
  };

  return (
    <>
      <Meta
        title="Dance.Studio"
        description="Practice and Compete in fun dancing challenges."
      />

      <Container>
        <PoseNet
          inferenceConfig={{ decodingMethod: "single-person" }}
          input={step}
          onEstimate={poses => {
            pose1 = poses;


          }}
        />
        <PoseNet
        inferenceConfig={{ decodingMethod: "single-person" }}
        onEstimate={onChange}
        />
        <br/>
        <div> <ReactStoreIndicator
        value={count}
        maxValue={100}
      /> </div>
      </Container>
    </>
  );
}

export default Welcome;

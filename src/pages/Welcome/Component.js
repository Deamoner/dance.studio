import React from 'react';
import { useMemo, useCallback } from "react"
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


  // get image for testing funciton
  const input = useMemo(() => {
    const image = new Image()
    image.crossOrigin = ""
    //https://imgur.com/gallery/J2RvXlf
    //image.src = "https://i.imgur.com/2IA9xFG.jpg"
    image.src = "https://i.imgur.com/KjsSnFo.png"
    return image
  }, [])
  // Here I need to make a function for
  let pose1 = {}
  let pose2 = {}
  let shown = false;
  let possim = []
  let posesimilarity1 = 0;


  const onChange = (e) => {

    if(pose1 && e[0]){
      console.log(pose1[0])
      console.log(e[0])
      posesimilarity1 = poseSimilarity(pose1[0], e[0], { strategy: 'cosineSimilarity' })
      console.log(posesimilarity1)
      if(posesimilarity1*100 > 95){
        alert("got here")
      }
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
          input={input}
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
        value={posesimilarity1}
        maxValue={100}
      /> </div>
      </Container>
    </>
  );
}

export default Welcome;

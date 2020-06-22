import React from 'react';
import { useMemo } from "react"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactPlayer from 'react-player'
//import DanceCam from 'components/DanceCam'
import PoseNet from "react-posenet"
import { FaReact as ReactIcon } from 'react-icons/fa';

import Meta from 'components/Meta';

import useStyles from './styles';


function Welcome() {
  const webcamRef = React.useRef(null);
  const input = useMemo(() => {
    const image = new Image()
    image.crossOrigin = ""
    image.src = "https://i.imgur.com/oV2ZNuD.jpg"
    return image
  }, [])
  return (
    <>
      <Meta
        title="Dance.Studio"
        description="Practice and Compete in fun dancing challenges."
      />

      <Container>






        <PoseNet
          input={input}
        />
        <PoseNet
          
        />
      </Container>
    </>
  );
}

export default Welcome;

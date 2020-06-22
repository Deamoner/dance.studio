import React from 'react';

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
  return (
    <>
      <Meta
        title="Dance.Studio"
        description="Practice and Compete in fun dancing challenges."
      />

      <Container>






        <PoseNet

        />
      </Container>
    </>
  );
}

export default Welcome;

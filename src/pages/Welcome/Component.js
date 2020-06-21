import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Webcam from "react-webcam";
import ReactPlayer from 'react-player'
import { FaReact as ReactIcon } from 'react-icons/fa';

import Meta from 'components/Meta';

import useStyles from './styles';

function Welcome() {
  const matchSmallScreen = useMediaQuery('(max-width: 600px)');
  const classes = useStyles({ isSmallScreen: matchSmallScreen });

  return (
    <>
      <Meta
        title="Dance.Studio"
        description="Practice and Compete in fun dancing challenges."
      />

      <Container maxWidth="sm" className={classes.root}>

        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width="50%"/>




        <Webcam style={{position:"relative", width:"50%", height:"50%"}} />
      </Container>
    </>
  );
}

export default Welcome;

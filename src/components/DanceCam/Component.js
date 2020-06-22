import React, { useRef, Component, Fragment } from 'react';
import Webcam from "react-webcam";
import * as posenet from "@tensorflow-models/posenet";


const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user"
};

class DanceCam extends Component {

  constructor (props) {
   super();
   this.myRef = React.createRef();
   this.state = {
    a: 1,
    b: 2
   };
}


  async capture() {
      //const imageSrc = refs.getScreenshot();
      console.log("got here")
    }

  async loadModels(){
      this.net = await posenet.load({
        architecture: "ResNet50",
        outputStride: 32,
        inputResolution: { width: this.width, height: this.height },
        quantBytes: 2
      });
      this.net2 = await posenet.load({
        architecture: "ResNet50",
        outputStride: 32,
        inputResolution: { width: this.width, height: this.height },
        quantBytes: 2
      });
      if (this.net != null && this.net2 != null) {
        this.modelLoaded = true;
      }
    }

  render() {

    return (
      <>
        <Webcam
          audio={false}
          height={360}
          ref={this.myRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
      </>
    )
  };
};

export default DanceCam

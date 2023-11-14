import React, { useContext, useRef, useState } from 'react';
import Webcam from 'react-webcam';


function Webcamera({currentPerson}) {
    var images = {
        "person1":[],
        "person2":[]
    }
    
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    }

    function storeImgData(img){
        if (currentPerson == 1) {
            images.person1.push(img)
        }
        else{
            images.person2.push(img)
        }
    }
    

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
      },
      [webcamRef]
    );
    return (
        <>
            <div className='camView d-flex justify-content-center'>
                <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className='rounded-3'
                />
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <button onClick={capture} className='btn btn-primary'>Capture photo</button>
            </div>
            
        </>
    );
};

export default Webcamera;
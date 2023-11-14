import { useState,useRef,useCallback} from "react"
import Webcam from 'react-webcam';

export default function App(){
    const [currentPerson,setCurrentPerson] = useState(1)
    const [uploadedPart,setuploadedPart] = useState(0)
    const [finish,setFinish] = useState(false)
    var images = {
        "person1":[],
        "person2":[]
    }
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    }

    function uploadImgToServer(images) {
         // Send data to the backend via POST
        fetch('http://localhost:5000/writeimg', {  // Enter your IP address here

        method: 'POST', 
        mode: 'cors', 
        body: JSON.stringify(images) // body data type must match "Content-Type" header

    })
    }

    function storeImgData(img){
        if (currentPerson == 1) {
            images.person1.push(img)
        }
        else{
            images.person2.push(img)
        }
    }
    

    const webcamRef = useRef(null);
    const capture = useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        storeImgData(imageSrc);
        if (uploadedPart == 3 && currentPerson == 2){
            setFinish(true)
        }
        
        setuploadedPart(uploadedPart + 1)
      },
      [webcamRef]
    );
    return (
        <>
            <header className="w-100 shadow-5 bg-light p-3">
                <div className="p-2">
                    <h1 className="h4 text-primary">FaceMatch</h1>
                </div>
            </header>
            <div className="container p-5">
                <div className="row">
                    <div className="col-4">
                        <button className="btn btn-danger rounded-3 p-2"><p className="text-white h4">upload images</p></button>
                    </div>
                    <div className="col-4">
                        <div className="p-2 bg-success rounded-3">
                            <p className="text-center text-white h4">person {currentPerson}</p>
                        </div> 
                    </div>
                    <div className="col-4">
                        <div className="p-1 row">
                            <div className=" p-1 col">
                                <p className="h4 text-primary"> person {currentPerson} images  </p>
                                <div class="progress">
                                <div class="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    25%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row  mt-2 ">
                                <div className="col  p-3 ">
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
                            <button onClick={capture} className='btn btn-primary' disable= {finish} >Capture photo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

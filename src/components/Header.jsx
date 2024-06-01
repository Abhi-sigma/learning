import { useState, useEffect } from "react";



function Header() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [isprofilePictureSet, setisprofilePictureSet] = useState(false);


    useEffect(() => {
        let profilePicture = localStorage.getItem("profilePicture");
        if (profilePicture != null) {
            setProfilePicture(profilePicture);
        }

    }, [isprofilePictureSet])


    const capturePhoto = (profilePictureSetter) => {
        document.getElementById("opaque_layer").style.display = "block";
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                const videoContainer = document.createElement("div");
                videoContainer.className = "videoContainer";
                const videoElement = document.createElement('video');
                videoElement.srcObject = stream;
                videoElement.onloadedmetadata = () => {
                    videoElement.play();
                    const canvas = document.createElement('canvas');
                    canvas.width = videoElement.videoWidth;
                    canvas.height = videoElement.videoHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                    // Create a button element for capturing the photo
                    const captureButton = document.createElement('button');
                    captureButton.textContent = 'Take Photo';
                    captureButton.onclick = () => {
                        // Draw the current frame onto the canvas again
                        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                        const imageData = canvas.toDataURL('image/png');
                        localStorage.setItem('profilePicture', imageData);
                        profilePictureSetter(imageData);
                        // Stop video stream and remove video element (optional)
                        stream.getVideoTracks()[0].stop();
                        videoElement.remove();
                        videoContainer.remove();
                        document.getElementById("opaque_layer").style.display = "none";

                    };

                    // Append the button to the canvas area
                    videoContainer.appendChild(videoElement);
                    videoContainer.appendChild(captureButton);
                    document.body.appendChild(videoContainer);




                };
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    }



    return (
        <>
            <div className="headerContainer">
                <div className="profileContainer">
                    <img src={profilePicture}></img>
                    {!profilePicture ? <button disabled={isButtonDisabled}
                        onClick={() => {
                            setButtonDisabled(true);
                            capturePhoto(setProfilePicture);
                        }}>
                        Set Picture</button> : ""}
                </div>
            </div>



            <div>

            </div>




        </>
    )

}

export default Header;
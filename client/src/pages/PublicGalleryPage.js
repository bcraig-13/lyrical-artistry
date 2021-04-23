import { useEffect, useState } from "react";
import API from "../util/API";

function Gallery() {
  const [userImages, setUserImages] = useState([]);
  const [imageModalShow, showLargeImageModal] = useState(false);
  const [imageModalURL, setImageModalURL] = useState("");

  // const ws = new WebSocket("ws://localhost:8000");

  // const HOST = window.location.origin.replace(/^http/, 'ws');
  // const ws = new WebSocket(HOST);
  
  // const sendButton = () => {
  //   ws.send(JSON.stringify({
  //       "message" : "hi"
  //   }))
  // }

  // useEffect(() => {

  //   ws.onopen = () => {
  //     console.log(`Opened Connection!`)
  //   };

  //   ws.onmessage = (event) => {
  //     console.log(JSON.parse(event.data));
  //     // setImageModalURL(JSON.parse(event.data));
  //   }

  //   ws.onclose = () => {
  //     console.log(`Closed Connection!`)
  //   };
  // }, []);

  // useEffect(() => {
  //   API.getAllUserImages().then((res) => {
  //     setUserImages(res.data.map(image => {
  //       return {
  //         id: image._id,
  //         image: image.imageS3Url
  //       }
  //     }));
  //   })
  // }, [userImages])

  // //   const showImageModal = (imageURL) => {
  // //     handleModalOpen();
  // //     setImageModalURL(imageURL);
  // //   }

  // //   const handleModalClose = () => showLargeImageModal(false);
  // //   const handleModalOpen = () => showLargeImageModal(true);

  return (
    <div className="container-fluid portfolio-bg" style={{ marginTop: "50px" }}>
      <div className="row mx-auto">
        {/* <button onClick={sendButton}>Click Me</button> */}

      </div>
    </div>
  );
}
export default Gallery;
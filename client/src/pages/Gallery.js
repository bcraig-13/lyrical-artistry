import { useEffect, useState } from "react";
import ImageCard from "../components/Gallery/ImageCard";
import LargeImageModal from "../components/Gallery/LargeImageModal";
import API from "../util/API";
import { NavLink } from "react-router-dom";

function Gallery() {
  const [userImages, setUserImages] = useState([]);
  const [imageModalShow, showLargeImageModal] = useState(false);
  const [imageModalURL, setImageModalURL] = useState("");

  useEffect(() => {
    API.getAllUserImages().then((res) => {
      setUserImages(res.data.map(image => {
        return {
          id: image._id,
          image: image.imageS3Url
        }
      }));
    })
  }, [userImages])

  const showImageModal = (imageURL) => {
    handleModalOpen();
    setImageModalURL(imageURL);
  }

  const handleModalClose = () => showLargeImageModal(false);
  const handleModalOpen = () => showLargeImageModal(true);

  return (
    <div className="container-fluid portfolio-bg" style={{ marginTop: "50px" }}>
      <div className="row mx-auto">
        <LargeImageModal
          imageModalURL={imageModalURL}
          handleModalClose={handleModalClose}
          show={imageModalShow}>
        </LargeImageModal>

          {/* //Message if gallery is empty */}
        {userImages.length === 0 &&
          <div style={{ textAlign: "center", backgroundColor: "white" }}>
            <img style={{ width: "300px", height: "300px" }} src={process.env.PUBLIC_URL + "/icons/emptyFolder.png"} alt="emptyFolderIcon"></img>
            <h2>Your Gallery is Empty.</h2>
            <h2>Go to
              <NavLink to="/canvasPage">
                &nbsp; Edit Picture &nbsp;
              </NavLink>
               to Begin Adding Pictures.</h2>
          </div>}

          {/* //Images */}
        <div className="row">
          {userImages.map((image) => (
            <div className="col-sm-6 col-md-3 col-xl-3">
              <ImageCard
                key={image.id}
                id={image.id}
                img={image.image}
                showImageModal={showImageModal}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default Gallery;
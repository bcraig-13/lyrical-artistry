import { useEffect, useState } from "react";
import ImageCard from "../components/Gallery/ImageCard";
import API from "../util/API";
import { NavLink } from "react-router-dom";

function Gallery() {
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    API.getAllUserImages().then((res) => {
      setUserImages(res.data.map(image => {
        return {
          name: image.name,
          id: image._id,
          image: image.img.data
        }
      }));
    })
  }, [userImages])

  return (
    <div className="container-fluid portfolio-bg" style={{ marginTop: "50px" }}>
      <div className="row mx-auto">
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
        {userImages.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            img={image.image}
            name={image.name}
          />
        ))}
      </div>
    </div>
  );
}
export default Gallery;
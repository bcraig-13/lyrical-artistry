import { useEffect, useState } from "react";
import ImageCard from "../components/Gallery/ImageCard";
import API from "../util/API";
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
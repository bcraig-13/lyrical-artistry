import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import api from "../util/API";

function Gallery() {
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    api.getImages().then((res) => {
      setUserImages(res.data.map(image => {
        return {
          name: image.name,
          id: image._id,
          image: image.img.data
        }
      }));
    })
  }, [setUserImages])
  return (
    <div className="container-fluid portfolio-bg" style={{ marginTop: "50px" }}>
      <div className="row mx-auto">
        {userImages.length ? userImages.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            img={image.image}
            name={image.name}
          />
        )):<div></div>}
      </div>
      <form action="/gallery" method="GET"></form>
    </div>
  );
}

export default Gallery;

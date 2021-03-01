import React from "react";
import ImageCard from "./ImageCard";

function Gallery() {
  // userImages must be a const with an array that equals the user's db
  const userImages = []
  return (
    // Bootstrap container and row go here
    <div className="container-fluid portfolio-bg" style={{ marginTop: "50px" }}>
    <div className="row mx-auto">
      {userImages.map((images, idx) => (
        <ImageCard key={idx} id={images.id} img={images.img} name={images.name} />
      ))}
    </div>
  </div>
  );
}

export default Gallery;

import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import api from "../util/API";

function Gallery() {
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    api.getImages().then((res) => {
      console.log(res.data[0].img);
      console.log(res.data[0].name);
      const toAdd = { "id": res.data[0]._id, "image": res.data[0].img, "name": res.data[0].name};
      setUserImages([toAdd]);
    })
  }, [setUserImages])
  return (
    <div className="container-fluid portfolio-bg" style={{ marginTop: "50px" }}>
      <div className="row mx-auto">
        {userImages.map((images, idx) => (
          <ImageCard
            key={idx}
            id={images.id}
            img={images.img}
            name={images.name}
          />
        ))}
      </div>
      <form action="/gallery" method="GET"></form>
    </div>
  );
}

export default Gallery;

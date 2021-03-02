import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import api from "../util/API";

function Gallery() {
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    api.getImages().then((res) => {
      // console.log(res.data[0].img);
      // console.log(res.data[0].name);
      // debugger;
      // let imgUrl = `data:image/${res.data[0].img.contentType};base64,${res.data[0].img.data.data.toString("base64")}`
      // const toAdd = { "id": res.data[0]._id, "name": res.data[0].name, "image": imgUrl};
      setUserImages(res.data.map(image => {
        return {
          name: image.name,
          id: image._id,
          image: image.img.data
        }
      }));
      // <img src="data:image/<%=image.img.contentType%>;base64,
      //                <%=image.img.data.toString('base64')%>"></img>
    })
  }, [setUserImages])
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
      <form action="/gallery" method="GET"></form>
    </div>
  );
}

export default Gallery;

import React from "react";

function Gallery() {
  return (
    <div className="card" style={{width: "18rem"}}>
      <img src="..." className="card-img-top" alt={imageTitle} />
      <div className="card-body">
        <h5 className="card-title">{imageTitle}</h5>
      </div>
    </div>
  );
}

export default Gallery;

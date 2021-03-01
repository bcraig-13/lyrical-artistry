import React from "react";
import test from "../img/test.jpg";

function Gallery() {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <a href={test} target="_blank" rel="noreferrer"><img
        src={test}
        className="card-img-top"
        alt=""
        style={{ width: "18rem", height: "200px" }}
      /></a>
      <div className="card-body">
        <h5 className="card-title">Test</h5>
      </div>
    </div>
  );
}

export default Gallery;

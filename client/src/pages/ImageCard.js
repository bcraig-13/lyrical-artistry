import React from "react";

function ImageCard(props) {
  return (
    <div className="card" style={{ width: "30rem", height: "30rem" }}>
      {/* <a href={props.img} target="_blank" rel="noreferrer"> */}
        <img
          src={props.img}
          className="card-img-top"
          alt=""
          style={{ width: "30rem", height: "30rem" }}
          />
      {/* </a> */}
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
    </div>
  );
}

export default ImageCard;

import React from "react";

function ImageCard(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <a href={props.img} target="_blank" rel="noreferrer">
        <img
          src={props.img}
          className="card-img-top"
          alt=""
          style={{ width: "18rem", height: "200px" }}
        />
      </a>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
      <form action="/gallery" method="GET"></form>
    </div>
  );
}

export default ImageCard;

import React from "react";
import API from "../../util/API";
import { useState } from "react";

function ImageCard(props) {
  const [imageOptions, showImageOptions] = useState(false);

  const deletePicture = (pictureId) => {
    API.deletePicture(pictureId);
  }

  return (
    <div className="card" style={{ width: "30rem", height: "30rem", marginLeft: "10px", marginTop: "10px", position: "relative" }}
      onMouseEnter={() => showImageOptions(true)}
      onMouseLeave={() => showImageOptions(false)}>

      <div>
        {/* <h5>Fish</h5> */}
      </div>
      <img
        src={props.img}
        className="card-img-top"
        alt={props.name}
        style={{ width: "30rem", height: "30rem" }}

      />
      {imageOptions && <button className="btn-primary-dark"
        style={{ position: "absolute", zIndex: "100", bottom: "0", left: "45%" }}
        onClick={() => deletePicture(props.id)}>
        <img src={process.env.PUBLIC_URL + "/icons/trashCan.png"}
          style={{ width: "65px", height: "70px" }}
          alt="trashCanIcon" />
      </button>}
    </div>
  );
}

export default ImageCard;

import React from "react";
import API from "../../util/API";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

function ImageCard(props) {
  const [imageOptions, showImageOptions] = useState(false);

  const deletePicture = (pictureId) => {
    console.log(props.img);
    API.deletePicture(pictureId);
  }

  return (
    <div className="card" style={{ width: "100%", height: "auto", marginLeft: "5px", marginTop: "20px", position: "relative" }}
      onMouseEnter={() => showImageOptions(true)}
      onMouseLeave={() => showImageOptions(false)}>
      <img
        src={props.img}
        className="card-img-top"
        alt={props.id}
        style={{}}
      />
      {imageOptions &&
        <div style={{ position: "absolute", zIndex: "100", top: "0", right: "0" }}>
          <Dropdown alignRight={true}>
            <Dropdown.Toggle><i className="arrow down"></i></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item drop="down" href={`${props.img}`} download="image.png">Download</Dropdown.Item>
              <Dropdown.Item onClick={() => deletePicture(props.id)} drop="down">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      }
    </div >
  );
}

export default ImageCard;

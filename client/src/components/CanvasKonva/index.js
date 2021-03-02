import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';

function CanvasKonva(props) {


  // const width = window.innerWidth;
  // const height = window.innerHeight;
  // ^^^ think this'll only work if there is a div controlling size that canvas is in...

  const imgSrc = "./exPhoto.jpg";
  const [image] = useImage(imgSrc);

  const [isDragging, setIsDragging] = useState(false);
  const [currX, setCurrX] = useState(50);
  const [currY, setCurrY] = useState(50);
  const [textToAdd, setTextToAdd] = useState("");
  const [fontToAdd, setFontToAdd] = useState("arial");
  const [sizeToAdd, setSizeToAdd] = useState(20);
  const [colorToAdd, setColorToAdd] = useState("black");


  const width = 500;
  const height = 500;


  // imageObj.src = "./exPhoto.jpg";




  // const handleExport = () => {
  //     const uri = stageRef.current.toDataURL();
  //     console.log(uri);
  //     // we also can save uri as file
  //     // but in the demo on Konva website it will not work
  //     // because of iframe restrictions
  //     // but feel free to use it in your apps:
  //     // downloadURI(uri, 'stage.png');
  //   };


  const stageRef = useRef(null);
  // <canvas id="canvas" ref={canvasRef} />

  return (
    <div>

      <h4>Add text to canvas and drag it</h4>
      <input onChange={(event) => setTextToAdd(event.target.value)} value={textToAdd} id="theText" placeholder="text" type="text" />
      <input onChange={(event) => setFontToAdd(event.target.value)} value={fontToAdd} id="theFont" placeholder="font" type="text" />
      <input onChange={(event) => setSizeToAdd(event.target.value)} value={sizeToAdd} id="theSize" placeholder="size" type="number" />
      <input onChange={(event) => setColorToAdd(event.target.value)} value={colorToAdd} id="theColor" placeholder="color" type="text" />

      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          <Image image={image} width={width} height={height} />
        </Layer>

        {/* state for align: center vs align: right would be good too! */}
        
        <Layer>
          <Text
            text={textToAdd}
            fontSize={sizeToAdd}
            fontFamily={fontToAdd}

            x={currX}
            y={currY}

            draggable
            fill={isDragging? colorToAdd !=='green'? 'green': 'blue' : colorToAdd}
            onDragStart={() => {
              setIsDragging(true)
            }}
            onDragEnd={e => {
              setIsDragging(false);
              setCurrX(e.target.x());
              setCurrY(e.target.y());
            }}
          />
        </Layer>

      </Stage>

    </div>
  )

}

export default CanvasKonva;


// @media (inverted-colors: inverted) {
//   p {
//     background: black;
//     color: yellow;
//   }
// }
// ^^^ might be able to use on the text im dragging? wouldn't hold my breath though...
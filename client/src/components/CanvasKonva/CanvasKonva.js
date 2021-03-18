import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';
import { v4 as uuidv4 } from 'uuid';
import API from "../../util/API";
import QuotesSelectionCanvas from "./QuotesSelectionCanvas";
import "./style.css";
// import Button from 'react-bootstrap/Button';


function CanvasKonva(props) {


  // const width = window.innerWidth;
  // const height = window.innerHeight;
  // ^^^ think this'll only work if there is a div controlling size that canvas is in...

  // = "./exPhoto.jpg";
  const [imgSrc, setImgSrc] = useState({});
  const [image] = useImage(imgSrc.file);
  // console.log([image.width, image.height])

  const [isDragging, setIsDragging] = useState(false);


  const [textsList, setTextLists] = useState([]);
  const [inputToAdd, setInputToAdd] = useState({
    textToAdd: "",
    fontToAdd: "arial",
    sizeToAdd: 20,
    colorToAdd: "black",
    currX: 50,
    currY: 50,
    // ListDragging: false
  });
  const [workName, setWorkName] = useState("");
  //Retrieve list of quotes stored in DB
  const [quotes, setQuotes] = useState([]);

  const width = 500;
  const height = 500;


  // ==================================================================================
  // IGNORE (poss enhancment- scale canvas to image height)
  // img.onload = function() {
  //   c.width = this.naturalWidth;     // update canvas size to match image
  //   c.height = this.naturalHeight;
  // }
  // ==================================================================================


  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;

  }

  const handleExport = () => {
    const url = stageRef.current.toDataURL();

    const blob = dataURItoBlob(url);

    // console.log(url);


    const data = new FormData();
    data.append("image", blob, workName);
    API.postImage(data);

    // API.postWork(workName, uri);
    // stageRef.current.toDataURL().then()

  };


  const stageRef = useRef(null);
  // <canvas id="canvas" ref={canvasRef} />

  function handleTextSubmit(event) {

    event.preventDefault();

    if (inputToAdd.textToAdd) {
      setTextLists([...textsList, inputToAdd]);
      setInputToAdd({
        ...inputToAdd,
        textToAdd: "",
        currX: 50,
        currY: 50,
        listDragged: false
      })
    }
  }


  function openImage(event) {
    console.log(event);
    const url = URL.createObjectURL(event.target.files[0]);
    setImgSrc({ file: url });
    // this.setState({
    //   file: URL.createObjectURL(event.target.files[0])
    // })
  }

  /* the ones saved in list */
  function mapTexts(textsArr) {
    let count = -1;
    return (textsArr.map(textEntry => {

      const {
        textToAdd,
        fontToAdd,
        sizeToAdd,
        colorToAdd,
        currX,
        currY,
        // listDragged

      } = textEntry;
      count++;
      return (
        < Text
          key={uuidv4()}
          className={count}
          text={textToAdd}
          fontSize={sizeToAdd}
          fontFamily={fontToAdd}

          x={currX}
          y={currY}
          fill={colorToAdd}


        // need to work on the update when done dragging!
        // draggable
        // fill={listDragged ? colorToAdd !== 'green' ? 'green' : 'blue' : colorToAdd}
        // onDragStart={() => {
        //   setIsDragging(true);
        //   const newIds = textsList.slice() //copy the array
        //   newIds[count] = { ...textsList[count], listDragged: true } //execute the manipulations
        //   setTextLists(newIds); //set the new state
        // }}
        // onDragEnd={e => {
        //   setIsDragging(false);

        //   const newIds = textsList.slice() //copy the array
        //   newIds[count] = { ...textsList[count], listDragged: false, currX: e.target.x(), currY: e.target.y() } //execute the manipulations
        //   setTextLists(newIds); //set the new state

        //   // textsList[count] need to destructure the index number!
        // }}
        />
      )
    })

    )

  }


  function changeInputToLyrics(quote) {
    setInputToAdd({ ...inputToAdd, textToAdd: quote });
  }

  useEffect(() => {
    API.getAllUserQuotes().then(quotes => {
      setQuotes(quotes.data);
    })
  }, [])

  return (
    <div>
      {quotes.length > 0 && quotes.map(quote => (
        <QuotesSelectionCanvas {...quote} changeInputToLyrics={changeInputToLyrics} />
      ))}

      <div className="canvasInput">

        <h4 className="canvas">Upload File:</h4>
        <input type="file" className="canvas mb-5" onChange={(event) => openImage(event)} />

        <h4 className="canvas">Add text to canvas and drag it</h4>

        <div className="toolbar mb-3 p-1">

          <label className="canvas">text:</label>
          <input className="input-group longText" onChange={(event) => setInputToAdd({ ...inputToAdd, textToAdd: event.target.value })} value={inputToAdd.textToAdd} id="theText" placeholder="text" type="text" />
          {/* <input onChange={(event) => setTextToAdd(event.target.value)} value={textToAdd} id="theText" placeholder="text" type="text" /> */}
          <label className="canvas">font:</label>
          <input className="input-group" onChange={(event) => setInputToAdd({ ...inputToAdd, fontToAdd: event.target.value })} value={inputToAdd.fontToAdd} id="theFont" placeholder="font" type="text" />
          <label className="canvas">size:</label>
          <input className="input-group" onChange={(event) => setInputToAdd({ ...inputToAdd, sizeToAdd: parseInt(event.target.value) })} value={inputToAdd.sizeToAdd} id="theSize" placeholder="size" type="number" />
          <label className="canvas">color:</label>
          <input className="input-group" onChange={(event) => setInputToAdd({ ...inputToAdd, colorToAdd: event.target.value })} value={inputToAdd.colorToAdd} id="theColor" placeholder="color" type="text" />
          <button
            id="addText"
            className="btn btn-light btn-sm mb-1"
            onClick={(event) => handleTextSubmit(event)}
          // submit button is gonna add to list of texts
          >Fix Text to Image</button><br />

        </div>


        <Stage width={width} height={height} ref={stageRef}>
          <Layer>
            <Image image={image} width={width} height={height} />
          </Layer>

          {/* state for align: center vs align: right would be good too! */}

          <Layer>
            {/* the one we're working on */}
            <Text
              text={inputToAdd.textToAdd}
              fontSize={inputToAdd.sizeToAdd}
              fontFamily={inputToAdd.fontToAdd}

              x={inputToAdd.currX}
              y={inputToAdd.currY}

              draggable
              fill={isDragging ? inputToAdd.colorToAdd !== 'green' ? 'green' : 'blue' : inputToAdd.colorToAdd}
              onDragStart={() => {
                setIsDragging(true)
              }}
              onDragEnd={e => {
                setIsDragging(false);
                setInputToAdd({ ...inputToAdd, currX: e.target.x(), currY: e.target.y() });
              }}
            />

            {textsList.length ? mapTexts(textsList) : <Text></Text>}

          </Layer>

        </Stage>


        <label className="canvas mt-3">Save File As:</label>
        <input onChange={(event) => setWorkName(event.target.value)} value={workName} className="longText" id="filename" placeholder="text" type="text" />
        <button
          id="saveWork"
          className="btn btn-light btn-sm mb-1"
          onClick={(event) => handleExport(event)}
        // submit button is gonna add to list of texts
        >Save Work</button><br />

      </div>



    </div>
  )

}

export default CanvasKonva;



// ====================================================================================================================
// vvv good refs for future enhancements!

// @media (inverted-colors: inverted) {
//   p {
//     background: black;
//     color: yellow;
//   }
// }
// ^^^ might be able to use on the text im dragging? wouldn't hold my breath though...


// function colourNameToHex(colour)
// {
//     var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
//     "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
//     "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
//     "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
//     "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
//     "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
//     "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
//     "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
//     "honeydew":"#f0fff0","hotpink":"#ff69b4",
//     "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
//     "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
//     "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
//     "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
//     "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
//     "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
//     "navajowhite":"#ffdead","navy":"#000080",
//     "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
//     "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
//     "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
//     "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
//     "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
//     "violet":"#ee82ee",
//     "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
//     "yellow":"#ffff00","yellowgreen":"#9acd32"};

//     if (typeof colours[colour.toLowerCase()] != 'undefined')
//         return colours[colour.toLowerCase()];

//     return false;
// }

// function invertColor(hex) {
//   if (hex.indexOf('#') === 0) {
//       hex = hex.slice(1);
//   }
//   // convert 3-digit hex to 6-digits.
//   if (hex.length === 3) {
//       hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
//   }
//   if (hex.length !== 6) {
//       throw new Error('Invalid HEX color.');
//   }
//   // invert color components
//   var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
//       g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
//       b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
//   // pad each with zeros and return
//   return '#' + padZero(r) + padZero(g) + padZero(b);
// }

// function padZero(str, len) {
//   len = len || 2;
//   var zeros = new Array(len).join('0');
//   return (zeros + str).slice(-len);
// }
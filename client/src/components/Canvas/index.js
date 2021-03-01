import React, { useRef, useEffect } from "react";
import $ from "jquery";

function Canvas(props) {

    const { draw, ...rest } = props;
    const canvasRef = useRef(null);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // ^^^moved these out of useEffect(see what do)

    useEffect(() => {
        //Our first draw
        let animationFrameId

        //Our draw came here
        const render = () => {
            draw(ctx)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }

    }, [draw])



    // adding additional feature: gonna get it working before I integrate... (commenting out rest for now)

    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext('2d');

    // canvas related variables- before React...
    // var canvas = document.getElementById("canvas");
    // var ctx = canvas.getContext("2d");



    // // variables used to get mouse position on the canvas
    // var $canvas = $("#canvas");
    // var canvasOffset = $canvas.offset();
    // var offsetX = canvasOffset.left;
    // var offsetY = canvasOffset.top;
    // var scrollX = $canvas.scrollLeft();
    // var scrollY = $canvas.scrollTop();

    // // variables to save last mouse position
    // // used to see how far the user dragged the mouse
    // // and then move the text by that distance
    // var startX;
    // var startY;

    // // an array to hold text objects
    // var texts = [];

    // // // this var will hold the index of the hit-selected text
    // // var selectedText = -1;

    // var imageObj = new Image();
    // imageObj.src = "./exPhoto.jpg";

    // imageObj.onload = function () {
    //     ctx.drawImage(imageObj, 0, 0);
        // canvas.width = imageObj.width;
    //     // canvas.height = imageObj.height;
    //     // ^^^ figure way to get image dimensions first, then set canvas size! maybe don't even render canvas until it is in? 
    // }

    // // // clear the canvas & redraw all texts
    // function draw() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.drawImage(imageObj, 0, 0);
    //     for (var i = 0; i < texts.length; i++) {
    //         var text = texts[i];
    //         ctx.fillStyle = text.color;
    //         ctx.font = `${text.size}px ${text.font}`;

    //         // vvv code to check text hitbox
    //         // ctx.clearRect(text.x, text.y, text.width, text.height);

    //         ctx.fillText(text.text, text.x, text.y);
    //     }
    // }

    // // ===========================================================================================
    // // vvv code below deals with dragging text

    // // test if x,y is inside the bounding box of texts[textIndex]
    // function textHittest(x, y, textIndex) {
    //     var text = texts[textIndex];
    //     return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    // }

    // // handle mousedown events
    // // iterate through texts[] and see if the user
    // // mousedown'ed on one of them
    // // If yes, set the selectedText to the index of that text
    // function handleMouseDown(e) {
    //     e.preventDefault();
    //     startX = parseInt(e.clientX - offsetX);
    //     startY = parseInt(e.clientY - offsetY);
    //     // Put your mousedown stuff here
    //     for (var i = 0; i < texts.length; i++) {
    //         if (textHittest(startX, startY, i)) {
    //             selectedText = i;
    //         }
    //     }
    // }

    // // done dragging
    // function handleMouseUp(e) {
    //     e.preventDefault();
    //     selectedText = -1;
    // }

    // // also done dragging
    // function handleMouseOut(e) {
    //     e.preventDefault();
    //     selectedText = -1;
    // }

    // // handle mousemove events
    // // calc how far the mouse has been dragged since
    // // the last mousemove event and move the selected text
    // // by that distance
    // function handleMouseMove(e) {
    //     if (selectedText < 0) {
    //         return;
    //     }
    //     e.preventDefault();
    //     var mouseX = parseInt(e.clientX - offsetX);
    //     var mouseY = parseInt(e.clientY - offsetY);

    //     // Put your mousemove stuff here
    //     var dx = mouseX - startX;
    //     var dy = mouseY - startY;
    //     startX = mouseX;
    //     startY = mouseY;

    //     var text = texts[selectedText];
    //     text.x += dx;
    //     text.y += dy;
    //     draw();
    // }

    // // listen for mouse events
    // $("#canvas").mousedown(function (e) {
    //     handleMouseDown(e);
    // });
    // $("#canvas").mousemove(function (e) {
    //     handleMouseMove(e);
    // });
    // $("#canvas").mouseup(function (e) {
    //     handleMouseUp(e);
    // });
    // $("#canvas").mouseout(function (e) {
    //     handleMouseOut(e);
    // });


    // // ======================================================================
    // // vvv where to edit for font size, color, and style

    // $("#submit").click(function () {

    //     // calc the y coordinate for this text on the canvas; the texts.lenth * 20 helps ensure no overlap if make one after the other (without moving first)
    //     var y = 2 * ($("#theSize").val());

    //     // texts.length * 20 + 

    //     // get the text from the input element
    //     var text = {
    //         text: $("#theText").val(),
    //         font: $("#theFont").val(),
    //         size: $("#theSize").val(),
    //         color: $("#theColor").val(),
    //         x: 20,
    //         y: y
    //     };
    //     //   ^^^ might wanna 


    //     // calc the size of this text for hit-testing purposes
    //     // ctx.fillStyle=text.color;
    //     ctx.font = `${text.size}px ${text.font}`;
    //     text.width = ctx.measureText(text.text).width;
    //     text.height = text.size;

    //     // put this new text in the texts array
    //     texts.push(text);

    //     // redraw everything
    //     draw();

    // });


// becoming a mess (feature merging going poorly); gonna add features from one to another slowly, instead of in broad strokes

    // function DrawCanvas(props) {


    //     const { draw, ...rest } = props;
    //     const canvasRef = useRef(null);
    //     const [texts, setTexts] = useState([]);
    
    
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    
    //     const draw = (ctx) => {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         ctx.drawImage(imageObj, 0, 0);
    //         for (var i = 0; i < texts.length; i++) {
    //             var text = texts[i];
    //             ctx.fillStyle = text.color;
    //             ctx.font = `${text.size}px ${text.font}`;
    
    //             // vvv code to check text hitbox
    //             // ctx.clearRect(text.x, text.y, text.width, text.height);
    
    //             ctx.fillText(text.text, text.x, text.y);
    //         }
    //     }
    
    //     return (
    //         <div>
    //             <Canvas draw={draw} />
    //         </div>)
    
    // }



    return (
        <div>
            {/* <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script> */}
            <h4>Add text to canvas and drag it</h4>
            <input id="theText" placeholder="text" type="text" />
            <input id="theFont" placeholder="font" type="text" />
            <input id="theSize" placeholder="size" type="number" />
            <input id="theColor" placeholder="color" type="text" />
            <button id="submit">Draw text on canvas</button><br />
            <button id="download">Download</button><br />
            <canvas id="canvas" ref={canvasRef} {...props} width="3000" height="2500"></canvas>
        </div >
    )
}

export default Canvas;   
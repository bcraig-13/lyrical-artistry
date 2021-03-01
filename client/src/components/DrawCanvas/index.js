import React, { useEffect, useRef, useState } from "react";
import Canvas from "../Canvas";
import "jquery";

function DrawCanvas(props) {

    // vvv might change texts into a state
    // const [texts, setTexts] = useState([]);
    // const [textToAdd, setTextToAdd] = useState({});
    const [textToAdd, setTextToAdd] = useState("");
    const [fontToAdd, setFontToAdd] = useState("arial");
    const [sizeToAdd, setSizeToAdd] = useState(20);
    const [colorToAdd, setColorToAdd] = useState("black");
    const [widthToAdd, setWidthToAdd] = useState("black");
    const [heightToAdd, setHeightToAdd] = useState("black");
    const [xToAdd, setXToAdd] = useState(50);
    const [yToAdd, setYToAdd] = useState(50);


    const canvasRef = useRef(null);
    // let canvas;
    // let ctx;

    // var imageObj = new Image();
    // imageObj.src = "./exPhoto.jpg";

    // this var will hold the index of the hit-selected text
    var selectedText = -1;

    // variables used to get mouse position on the canvas
    var canvasOffset;
    var offsetX;
    var offsetY;
    var scrollX;
    var scrollY;

    var startX;
    var startY;

    const draw = (canvas, ctx, texts, imageObj) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageObj, 0, 0);

        // console.log("draw called");
        // console.log(texts);


        // vvv code to check text hitbox
        // ctx.fillStyle = "blue";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];


            ctx.fillStyle = text.color;
            ctx.font = `${text.size}px ${text.font}`;

            // ctx.fillText(text.text, text.x, text.y);
            // ^^^ will use this in actual font

            ctx.fillText(text.text, xToAdd, yToAdd);

            // vvv code to check text hitbox
            // ctx.clearRect(xToAdd, yToAdd, widthToAdd, heightToAdd);

        }
    }





    function handleTextSubmit() { }


    useEffect(() => {

        const canvas = canvasRef.current;

        // vvv vars that need to be referenceable for mouse clicks & hit testing
        // canvasOffset = canvas.offset();
        offsetX = canvas.offsetLeft;
        offsetY = canvas.offsetTop;

        // vvv need to find non-jQuery equivalent!
        // scrollX = canvas.scrollLeft();
        // scrollY = canvas.scrollTop();

        const ctx = canvas.getContext('2d');
        const imageObj = new Image();
        imageObj.src = "./exPhoto.jpg";


        imageObj.onload = () => {

            ctx.font = `${sizeToAdd}px ${fontToAdd}`;
            setWidthToAdd(ctx.measureText(textToAdd).width)
            setHeightToAdd(sizeToAdd);

            draw(canvas, ctx, [{ text: textToAdd, font: fontToAdd, size: sizeToAdd, color: colorToAdd }], imageObj)
        }

    }, [textToAdd, fontToAdd, sizeToAdd, colorToAdd, xToAdd, yToAdd])


    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext('2d');
    //     const imageObj = new Image();
    //     imageObj.src = "./exPhoto.jpg";
    //     imageObj.onload = () => {
    //         // ctx.drawImage(imageObj, 0, 0);
    //         draw(canvas, ctx, texts, imageObj)
    //     }
    // }, [])

    // test if x,y is inside the bounding box of texts[textIndex]
    function textHittest(x, y, textIndex) {
        console.log("hittest running");
        // var text = texts[textIndex];

        console.log(`testing${[x, y]}x,y;  hitbox: ${[xToAdd, xToAdd + widthToAdd, yToAdd - heightToAdd, yToAdd]}xL,xR,yB,yT`)

        if (x >= xToAdd && x <= xToAdd + widthToAdd && y >= yToAdd - heightToAdd && y <= yToAdd) {
            console.log("hittest hit")
        }

        return (x >= xToAdd && x <= xToAdd + widthToAdd && y >= yToAdd - heightToAdd && y <= yToAdd);
    }

    function handleMouseDown(e) {
        e.preventDefault();
        const canvas = canvasRef.current;
        offsetX = canvas.offsetLeft;
        offsetY = canvas.offsetTop;
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);

        // Put your mousedown stuff here
        // for (var i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY,)) {
            selectedText = 0;
        }
        // }
    }

    // done dragging
    function handleMouseUp(e) {
        e.preventDefault();
        selectedText = -1;
    }

    // also done dragging
    function handleMouseOut(e) {
        e.preventDefault();
        selectedText = -1;
    }


    // handle mousemove events
    // calc how far the mouse has been dragged since
    // the last mousemove event and move the selected text
    // by that distance
    function handleMouseMove(e) {
        if (selectedText < 0) {
            return;
        }
        e.preventDefault();
        console.log("hit text");
        var mouseX = parseInt(e.clientX - offsetX);
        var mouseY = parseInt(e.clientY - offsetY);

        // Put your mousemove stuff here
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;

        // var text = textToAdd[selectedText];
        setXToAdd(xToAdd + dx);
        console.log(xToAdd);
        setYToAdd(yToAdd + dy);
        console.log(yToAdd);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageObj = new Image();
        imageObj.src = "./exPhoto.jpg";

        draw(canvas, ctx, [{ text: textToAdd, font: fontToAdd, size: sizeToAdd, color: colorToAdd }], imageObj);
        // text.x += dx;
        // text.y += dy;
        // draw();
    }

    return (
        <div>
            {/* <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script> */}
            <h4>Add text to canvas and drag it</h4>
            <input onChange={(event) => setTextToAdd(event.target.value)} value={textToAdd} id="theText" placeholder="text" type="text" />
            <input onChange={(event) => setFontToAdd(event.target.value)} value={fontToAdd} id="theFont" placeholder="font" type="text" />
            <input onChange={(event) => setSizeToAdd(event.target.value)} value={sizeToAdd} id="theSize" placeholder="size" type="number" />
            <input onChange={(event) => setColorToAdd(event.target.value)} value={colorToAdd} id="theColor" placeholder="color" type="text" />
            <button
                id="submit"
                onSubmit={() => handleTextSubmit()}
            // submit button is gonna add to list of texts
            >Draw text on canvas</button><br />
            <button id="download">Download</button><br />
            <canvas id="canvas" ref={canvasRef} {...props} width="500" height="500"
                onMouseDown={(event) => handleMouseDown(event)}
                onMouseUp={(event) => handleMouseUp(event)}
                onMouseOut={(event) => handleMouseOut(event)}
                onMouseMove={(event) => handleMouseMove(event)}
            ></canvas>
        </div >
    )

}

export default DrawCanvas;
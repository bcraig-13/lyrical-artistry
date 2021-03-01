import React, { useEffect, useRef, useState } from "react";
import Canvas from "../Canvas";

function DrawCanvas(props) {

    // vvv might change texts into a state
    // const [texts, setTexts] = useState([]);
    // const [textToAdd, setTextToAdd] = useState({});
    const [textToAdd, setTextToAdd] = useState("testing");

    const canvasRef = useRef(null);
    // let canvas;
    // let ctx;

    // var imageObj = new Image();
    // imageObj.src = "./exPhoto.jpg";

    const draw = (canvas, ctx, texts, imageObj) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageObj, 0, 0);

        console.log("draw called");
        console.log(texts);

        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];


            ctx.fillStyle = text.color;
            ctx.font = `${text.size}px ${text.font}`;
            // ctx.fillText(text.text, text.x, text.y);
            // ^^^ will use this in actual font


            ctx.fillStyle = "black";
            ctx.font = "20px arial";
            ctx.fillText(text, 50, 50);
            // vvv code to check text hitbox
            // ctx.clearRect(text.x, text.y, text.width, text.height);

        }
    }


    var texts = [];

    var y = texts.length * 50 + 50
    texts = [
        {
            text: "test1",
            font: "arial",
            size: 50,
            color: "black",
            x: 20,
            y
        },
        {
            text: "test2",
            font: "arial",
            size: 50,
            color: "green",
            x: 20,
            y
        },
    ]

    function handleTextSubmit() { }


    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageObj = new Image();
        imageObj.src = "./exPhoto.jpg";

        imageObj.onload = () => {

            draw(canvas, ctx, [textToAdd], imageObj)
        }

    }, [textToAdd])


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

    return (
        <div>
            {/* <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script> */}
            <h4>Add text to canvas and drag it</h4>
            <input onChange={(event) => setTextToAdd(event.target.value)} value={textToAdd} id="theText" placeholder="text" type="text" />
            <input id="theFont" placeholder="font" type="text" />
            <input id="theSize" placeholder="size" type="number" />
            <input id="theColor" placeholder="color" type="text" />
            <button
                id="submit"
                onSubmit={() => handleTextSubmit()}
            >Draw text on canvas</button><br />
            <button id="download">Download</button><br />
            <canvas id="canvas" ref={canvasRef} {...props} width="500" height="500"></canvas>
        </div >
    )

}

export default DrawCanvas;
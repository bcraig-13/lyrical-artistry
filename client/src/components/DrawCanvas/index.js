import React, { useEffect, useRef } from "react";
import Canvas from "../Canvas";

function DrawCanvas(props) {

    const canvasRef = useRef(null);
    // let canvas;
    // let ctx;
    
    // var imageObj = new Image();
    // imageObj.src = "./exPhoto.jpg";

    // const draw = (ctx) => {
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

    // const draw = (ctx) => { }

    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageObj = new Image();
        imageObj.src = "./exPhoto.jpg";

        imageObj.onload = () => {
            ctx.drawImage(imageObj, 0, 0);
        }

        // draw(ctx)

    }, [])

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

export default DrawCanvas;
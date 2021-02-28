import React from "react";

function LyricsDisplay(props) {
    return (
        <div style={{whiteSpace: "pre"}}>
            {props.lyrics}
        </div>
    )
}

export default LyricsDisplay;    
import React from "react";

function LyricsDisplay(props) {
    return (
        <div style={{ whiteSpace: "pre", backgroundColor: "white", paddingLeft: "50px" }} onMouseUp={props.handleQuoteHighlight}>
            { props.lyrics}
        </div >
    )
}

export default LyricsDisplay;
import React from "react";

function SongResult(props) {
    return (
        <div>
            <h2>Title: {props.title}</h2>
            <div>Artist: {props.artist}</div>
            <div>Album: {props.album}</div>
            <button onClick={()=>props.viewSong(props.id)}>View</button>
            <button onClick={()=>props.saveSong(props.id)}>Save</button>
        </div>
    )
}

export default SongResult;    
import React from "react";

function SongResult(props) {
    return (
        <div>
            <h2>Title: {props.track.track.track_name}</h2>
            <div>Artist: {props.track.track.artist_name}</div>
            <div>Album: {props.track.track.album_name}</div>
            <button onClick={()=>props.handleTrackViewClick(props.track.track.track_id)}>View</button>
            {/* <button onClick={()=>props.saveSong(props.id)}>Save</button> */}
        </div>
    )
}

export default SongResult;    
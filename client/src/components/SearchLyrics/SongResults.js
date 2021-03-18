import React from "react";

function SongResult(props) {
    return (
        <div style={{ backgroundColor: "white", padding: "10px", borderStyle: "double" }}>
            <div className="row">
                <div className="col-md-9">
                    <h2>Title: {props.track.track.track_name}</h2>
                    <div>Artist: {props.track.track.artist_name}</div>
                    <div>Album: {props.track.track.album_name}</div>
                </div>
                <div className="col-md-3">
                    <button className = "btn btn-info"style={{marginTop: "50%"}} onClick={() => props.handleTrackViewClick(props.track.track.track_id)}>View</button>
                </div>
            </div>
        </div>
    )
}

export default SongResult;
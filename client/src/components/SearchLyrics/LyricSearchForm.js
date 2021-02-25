import React from "react";

function SearchBox(props) {
    return (
        <form style={{ margin: "auto", width: "75%"}}>
            <h3>Search for your favorite song lyrics</h3>
            <div>Song</div>
            <div className="form-group">
                <input className="form-control" onChange={() => { }} />
            </div>
            <button style={{ float: "right", marginBottom: 10 }} className="btn btn-success" onClick={() => { }}>
                Submit
            </button>
        </form>
    )
}

export default SearchBox;    
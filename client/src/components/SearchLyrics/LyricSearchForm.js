import React, { forwardRef } from "react";

const SearchInput = forwardRef((props, ref) => (
    <form style={{ margin: "auto", width: "75%" }} onSubmit={props.handleSearchTracksFormSubmit}>
        <h3>Search for your favorite song lyrics</h3>
        <div>Song</div>
        <input className="form-control" {...props} ref={ref} />
        <button style={{ float: "right", marginBottom: 10 }} className="btn btn-success" type="submit">
            Submit
        </button>
    </form>
));

export default SearchInput;    
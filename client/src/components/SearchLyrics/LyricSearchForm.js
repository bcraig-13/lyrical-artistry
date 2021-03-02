import React, { forwardRef } from "react";

const SearchInput = forwardRef((props, ref) => (
    <form style={{ margin: "auto", width: "80%" }} onSubmit={props.handleSearchTracksFormSubmit}>
        <h3>Search for your favorite song lyrics</h3>
        <div className="input-group">
            <input className="form-control" ref={ref} placeholder="e.g. Hey Jude"/>
            <button className="btn btn-success" type="submit" >
                Submit
        </button>
        </div>
    </form>
));

export default SearchInput;    
import React, { useRef } from "react";

function QuoteSelectForm(props) {
    const titleRef = useRef("");
    const artistRef = useRef("");
    const quoteRef = useRef("");

    const handleQuoteInputSubmit = (event) => {
        event.preventDefault();
        let quoteObject = {
            title: titleRef.current.value,
            artist: artistRef.current.value,
            quote: quoteRef.current.value
        };
        props.handleQuoteSaveClick(quoteObject);
    }


    return (
        <form style={{ margin: "auto", width: "75%", backgroundColor: "white" }} onSubmit={handleQuoteInputSubmit}>
            <div>Save your quote!</div>
            <input className="form-control" placeholder="e.g. Stairway To Heaven" ref={titleRef} />
            <input className="form-control" placeholder="e.g. Led Zeppelin" ref={artistRef} />
            <div key={props.quote}>
                <input className="form-control" ref={quoteRef} defaultValue={props.quote} />
            </div>
            <button style={{ float: "right", marginBottom: 10 }} className="btn btn-success" type="submit">
                Submit
        </button>
        </form>
    )
}

export default QuoteSelectForm;    
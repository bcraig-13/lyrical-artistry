import CanvasKonva from "../components/CanvasKonva/CanvasKonva";
import QuotesSelectionCanvas from "../components/CanvasKonva/QuotesSelectionCanvas"
import React, { useState, useEffect } from "react";
import API from "../util/API";

function CanvasPage() {

  const [quotes, setQuotes] = useState([]);
  const [quoteInput, setQuoteInput] = useState("");

  useEffect(() => {
    API.getAllUserQuotes().then(quotes => {
      setQuotes(quotes.data);
    })
  }, [])


  const handleQuoteSelectCanvas = (quote) => {
    // setQuoteInput(quote);
  }

  return (
    <div>

      {quotes.length > 0 && quotes.map(quote => (
        <QuotesSelectionCanvas {...quote} handleQuoteSelectCanvas={handleQuoteSelectCanvas} />
      ))}

      <h1>Edit your Lyrics</h1>
      {/* The below code is used for uploading and submitting an image. Need to integrate with canvas */}
      <h1>To Upload Image on mongoDB</h1>
      <hr />
      <CanvasKonva quoteInput={quoteInput}/>
    </div>
  );
}

export default CanvasPage;

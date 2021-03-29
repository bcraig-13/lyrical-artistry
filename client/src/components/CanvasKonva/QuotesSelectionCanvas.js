import API from "../../util/API";

function QuotesSelectionCanvas(props) {

  const deleteQuote = (quoteID) => {
    API.deleteQuote(quoteID);
  };

  return (

    <div style={{marginTop: "5px"}}>
      {props.quotes.map(quote => (
        <div>
            <div>Title: {quote.title}</div>
            <div>Artist: {quote.artist}</div>
            <div>Quote: {quote.quote}</div>
            <div>Created At: {quote.createdAt}</div>
            <button onClick={()=> props.changeInputToLyrics(quote.quote)}>Select</button>
            <button onClick={() => deleteQuote(quote._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default QuotesSelectionCanvas;

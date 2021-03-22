function QuotesSelectionCanvas(props) {

  return (

    <div>
      {props.quotes.map(quote => (
        <div>
            <div>Title: {quote.title}</div>
            <div>Artist: {quote.artist}</div>
            <div>Quote: {quote.quote}</div>
            <div>Created At: {quote.createdAt}</div>
            <button onClick={()=> props.changeInputToLyrics(quote.quote)}>Select</button>
        </div>
      ))}
    </div>
    // <div>
    //     <div>Title: {props.title}</div>
    //     <div>Artist: {props.artist}</div>
    //     <div>Quote: {props.quote}</div>
    //     <div>Created At: {props.createdAt}</div>
    //     <button onClick={()=> props.changeInputToLyrics(props.quote)}>Select</button>
    // </div>
  );
}

export default QuotesSelectionCanvas;

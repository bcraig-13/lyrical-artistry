function QuotesSelectionCanvas(props) {
  
  return (
    <div>
        <div>Title: {props.title}</div>
        <div>Artist: {props.artist}</div>
        <div>Quote: {props.quote}</div>
        <div>Created At: {props.createdAt}</div>
        <button onClick={()=> props.changeInputToLyrics(props.quote)}>Select</button>
    </div>
  );
}

export default QuotesSelectionCanvas;

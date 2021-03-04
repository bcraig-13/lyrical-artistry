import LyricSearchForm from "../components/SearchLyrics/LyricSearchForm";
import SongResult from "../components/SearchLyrics/SongResults";
import LyricsDisplay from "../components/SearchLyrics/LyricsDisplay"
import QuoteSelectForm from "../components/SearchLyrics/QuoteSelectForm";
import React, { useState, useEffect, useRef } from "react";
import API from "../util/API";


function SearchLyricsPage() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [lyrics, setLyrics] = useState("");
    const [quote, setQuote] = useState("");
    const trackRef = useRef();


    useEffect(() => {
        if (search !== "") {
            API.getTracks(search).then((response) => {
                setResults(response.data.message.body.track_list)
            })
        }
    }, [search])

    //handle when user submits form
    const handleSearchTracksFormSubmit = (event) => {
        event.preventDefault();
        setSearch(trackRef.current.value.trim());
    };

    //each track contains view and save button. This views the lyrics of the track.
    const handleTrackViewClick = (trackID) => {
        API.getLyrics(trackID).then((response) => {
            let lyrics = response.data.message.body.lyrics.lyrics_body;
            lyrics.replace("\n", "{\n}")
            setLyrics(lyrics);
        });
    };

    const handleQuoteSaveClick = (quoteObject) => {
        API.postQuotes(quoteObject);
    }

    const handleQuoteHighlight = () => {
        if (window.getSelection() !== "") {
            setQuote(window.getSelection().toString());
        };
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3" >
                    <LyricSearchForm ref={trackRef} handleSearchTracksFormSubmit={handleSearchTracksFormSubmit} />
                    {/* {results.length > 0 && results.map((track) => <SongResult track={track} handleTrackViewClick={handleTrackViewClick} key={track.track.track_name} />)} */}
                    {results.length > 0 &&
                        <div style={{ overflow: "scroll", width: "100%", height: "400px ", marginTop: "10px", marginLeft: "10px", borderRadius: "25px 0px 0px 25px"}}>
                            {results.map((track) => (
                                <SongResult track={track} handleTrackViewClick={handleTrackViewClick} key={track.track.track_name} />
                            ))}
                        </div>
                    }
                </div>
                <div className="col-md-5">
                    {/* {lyrics !== "" && <LyricsDisplay lyrics={lyrics} handleQuoteHighlight={handleQuoteHighlight} />} */}
                    {lyrics !== "" &&
                        <div style={{ overflowY: "auto", width: "100%", height: "575px " }}>
                            <LyricsDisplay lyrics={lyrics} handleQuoteHighlight={handleQuoteHighlight} />
                        </div>
                    }
                </div>
                <div className="col-md-4">
                    {quote !== "" && <QuoteSelectForm quote={quote} handleQuoteSaveClick={handleQuoteSaveClick} />}
                </div>
            </div>
        </div>)
}

export default SearchLyricsPage;

import LyricSearchForm from "./LyricSearchForm";
import SongResult from "./SongResults";
import LyricsDisplay from "./LyricsDisplay"
import QuoteSelectForm from "./QuoteSelectForm";
import NotificationSaveModal from "./NotificationSaveModal";
import React, { useState, useEffect, useRef } from "react";
import API from "../../util/API";
import { Modal } from "react-bootstrap";


function SongModal(props) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [lyrics, setLyrics] = useState("");
    const [quote, setQuote] = useState("");
    const [showNotification, showSaveSuccessful] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
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
        if (quoteObject) {
            API.postQuotes(quoteObject).then(() => {
                displaySuccessfulSave();
            });
        }
        else {
            setSaveSuccess(false);
            showSaveSuccessful(true);
        }
    }

    //=================================================================//
    const displaySuccessfulSave = () => {
        setQuote("");
        setSaveSuccess(true);
        showSaveSuccessful(true);
    }

    const handleQuoteHighlight = () => {
        if (window.getSelection() !== "") {
            setQuote(window.getSelection().toString());
        };
    }

    return (
        <Modal show={props.show} onHide={props.handleModalClose} dialogClassName="fullscreen-modal" scrollable={true} animation={true} >
            <Modal.Header closeButton>
                <Modal.Title>Search Lyrics</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-3" >
                        <LyricSearchForm ref={trackRef} handleSearchTracksFormSubmit={handleSearchTracksFormSubmit} />
                        {results.length > 0 &&
                            <div style={{ overflowY: "scroll", width: "90%", height: "75% ", marginTop: "10px", marginLeft: "10px", borderRadius: "25px 0px 0px 25px" }}>
                                {results.map((track) => (
                                    <SongResult track={track} handleTrackViewClick={handleTrackViewClick} key={track.track.track_name} />
                                ))}
                            </div>
                        }
                    </div>
                    <div className="col-md-5">
                        {lyrics !== "" &&
                            <div>
                                <h2>Highlight the Lyrics You Want To Save</h2>
                                <div style={{ overflowY: "auto", width: "100%", height: "575px", paddingLeft: "25px" }}>
                                    <LyricsDisplay lyrics={lyrics} handleQuoteHighlight={handleQuoteHighlight} />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-md-4">
                        {quote !== "" && <QuoteSelectForm quote={quote} handleQuoteSaveClick={handleQuoteSaveClick} />}
                    </div>
                    <div style={{ position: "absolute", right: "5px", bottom: "5px" }}>
                        <NotificationSaveModal category="lyric" showSaveSuccessful={showSaveSuccessful} show={showNotification} saveSuccessful={saveSuccess} />
                    </div>
                </div>

            </Modal.Body>
        </Modal>)
}

export default SongModal;

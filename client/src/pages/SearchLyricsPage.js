import LyricSearchForm from "../components/SearchLyrics/LyricSearchForm";
import SongResult from "../components/SearchLyrics/SongResults";
import LyricsDisplay from "../components/SearchLyrics/LyricsDisplay"
import React, { Component, useState, useEffect, useRef } from "react";
import API from "../util/API";


function SearchLyricsPage() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [lyrics, setLyrics] = useState("");
    const trackRef = useRef();

    useEffect(() => {
        if (search !== "") {
            API.getTracks(search).then((response) => {
                setResults(response.data.message.body.track_list)
            })
        }
    }, [search])

    // useEffect(() => {

    // }, [results])

    //handle when user submits form
    const handleSearchTracksFormSubmit = (event) => {
        event.preventDefault();
        setSearch(trackRef.current.value.trim());
    };

    //each track contains view and save button. This views the lyrics of the track.
    const handleTrackViewClick = (trackID) => {
        console.log(trackID);
        API.getLyrics(trackID).then((response) => {
            let lyrics = response.data.message.body.lyrics.lyrics_body;
            lyrics.replace("\n","{\n}")
            setLyrics(lyrics);
        }).then(() =>{
            console.log(lyrics);
            
        })

    }

    return (
        <div>
            <LyricSearchForm ref={trackRef} handleSearchTracksFormSubmit={handleSearchTracksFormSubmit} />
            {results.length > 0 && results.map((track)=><SongResult track={track} handleTrackViewClick={handleTrackViewClick}/>)}
            {lyrics !== "" && <LyricsDisplay lyrics={lyrics}/>}
        </div>)
}

export default SearchLyricsPage;

import LyricSearchForm from "../components/SearchLyrics/LyricSearchForm";
import React, { Component, useState, useEffect, useRef } from "react";
import API from "../util/API";


function SearchLyricsPage() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const trackRef = useRef();

    useEffect(() => {
        if (search !== "") {
            API.getTracks(search).then((response) => {
                setResults(response.data.message.body.track_list)
            })
        }
    }, [search])

    const handleSearchTracksFormSubmit = (event) => {
        event.preventDefault();
        setSearch(trackRef.current.value.trim());
    };

    return (
        <div>
            <LyricSearchForm ref={trackRef} handleSearchTracksFormSubmit={handleSearchTracksFormSubmit} />
        </div>)
}

export default SearchLyricsPage;

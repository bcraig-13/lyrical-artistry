import React, { useEffect, useState } from "react";

import axios from "axios";
// should ref the API file & write the axios request directly in the API file!





function Navbar() {




    const [userSearch, setUserSearch] = useState();

    // need to make so that hitting search redirects to user's profile page!

    useEffect(() => {
        //   console.log(privacySettings);
        if (userSearch) {
            axios.get(`/api/search/${userSearch}`).then((response) => {
                console.log(response);

            })
        }

    }, [userSearch])

    return (

        <input className="input-group" onChange={(event) => setUserSearch(event.target.value)} value={userSearch} id="userSearch" placeholder="search for friends" type="text" />


    )

}




export default Navbar;
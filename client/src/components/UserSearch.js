import React, { useEffect, useState } from "react";







function Navbar() {


    const [userSearch, setUserSearch] = useState();

    // need to make so that hitting search redirects to user's profile page!

    return (

        <input className="input-group" onChange={(event) => setUserSearch(event.target.value)} value={userSearch} id="userSearch" placeholder="search for friends" type="text" />


    )

}




export default Navbar;
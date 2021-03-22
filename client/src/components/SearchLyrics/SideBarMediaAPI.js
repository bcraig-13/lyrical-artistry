
import React, { useState } from "react";
import SongModal from "./SongModal";

function SideBarMediaAPI() {

    const [show, setShow] = useState(false);
    const handleModalClose = () => setShow(false);
    const handleModalOpen = () => setShow(true);

    return (
        <div>
            <img src={process.env.PUBLIC_URL + "/icons/music.png"} className="btn btn-primary"style={{
                objectFit: "contain",
                width: "50px"
            }} onClick={handleModalOpen} alt="projects" />
            <SongModal handleModalClose={handleModalClose} show={show} />
        </div>)

}

export default SideBarMediaAPI;

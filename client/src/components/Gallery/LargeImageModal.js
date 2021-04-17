
import { Modal, Image } from "react-bootstrap";
import "./galleryCSS.css"

function LargeImageModal(props) {

    return (
        <Modal show={props.show} onHide={props.handleModalClose} dialogClassName="custom-modal">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body dialogClassName="modal-body">
                <Image
                    src={props.imageModalURL}
                    style={{ objectFit: "fill", marginRight: "auto", marginLeft: "auto", display: "block", borderStyle :"solid"}}
                    alt={props.imageModalURL}
                    fluid
                ></Image>
            </Modal.Body>
        </Modal>)
}

export default LargeImageModal;

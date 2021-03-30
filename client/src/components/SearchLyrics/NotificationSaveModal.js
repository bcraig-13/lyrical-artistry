import { Toast } from "react-bootstrap";

function NotificationSaveModal(props) {

    return (
        <Toast onClose={() => props.showSaveSuccessful(false)} show={props.show} delay={3000} autohide>
            <Toast.Header>
                {props.saveSuccessful === true &&
                    <img src={process.env.PUBLIC_URL + "/icons/greenCheckmark.png"} style={{
                        width: "25px"
                    }} alt="greenCheckmark" />
                }
                {props.saveSuccessful === false &&
                    <img src={process.env.PUBLIC_URL + "/icons/redX.png"} style={{
                        width: "25px"
                    }} alt="redX" />
                }
                {props.saveSuccessful === true &&
                    <strong className="mr-auto" style={{ marginLeft: "5px" }}>Success!</strong>
                }
                {props.saveSuccessful === false &&
                    <strong className="mr-auto" style={{ marginLeft: "5px" }}>Failed!</strong>
                }
            </Toast.Header>
            <Toast.Body>
                {props.saveSuccessful === true &&
                    <div>Your {props.category} has been saved!</div>}
                {props.saveSuccessful === false &&
                    <div>Your {props.category} failed to save!</div>}
            </Toast.Body>
        </Toast>
    )
}

export default NotificationSaveModal;

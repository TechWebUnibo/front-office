import { Modal, Button } from "react-bootstrap";

const Notify = (props) => {
    let {data, ...properties } = props;
    return (
        <Modal
            {...properties}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {data.title}
                </Modal.Title>
            </Modal.Header> 
            <Modal.Body>
                <p>
                    {data.text}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Notify
import {Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {useState} from 'react';

/**
 * Icon with tooltip that triggers a modal with text to explain something
 * @param {string} title The text of te tooltip, also the title of the modal
 * @param {string} message The text of the modal
 */

const Explainer = (prop) => {

    //Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //tooltip
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {prop.title}
        </Tooltip>
    );

    return (
        <span><OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}>
            <Button variant="link p-0" onClick={handleShow}>
                <i className="bi bi-info-circle" onClick={handleShow}></i>
            </Button>
        </OverlayTrigger>

        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{prop.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{prop.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
        
    )
}
export default Explainer
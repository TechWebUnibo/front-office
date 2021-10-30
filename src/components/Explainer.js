import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState } from 'react';

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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
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
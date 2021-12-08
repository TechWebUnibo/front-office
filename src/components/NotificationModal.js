import { useState, React, useEffect } from "react";
import {Modal, Button} from "react-bootstrap";


function NotificationModal({show, setShow, notification, operationOnClosingModal}) {

    //const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        operationOnClosingModal(false)
    } 
    const handleShow = () => setShow(true);

    function handleNotRead() {
        operationOnClosingModal(true)
        //APIMarkAsNotRead
        setShow(false)
    }

    function handleDelete() {
        //APIDeleteNotification(notificationID)
        setShow(false)
    }

    useEffect(() => {
        
    },[show])
  
    return (  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{notification._id }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p> <b>Noleggio:</b> {notification.rent} </p>
            <p> <b>Stato:</b> {notification.state} </p>
            <p> <b>Data:</b> {notification.state} </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            {!notification.cheked && ( <Button variant="primary" onClick={handleNotRead}>Mantieni come non letta</Button> )}
            <Button variant="danger" onClick={handleDelete}>Elimina</Button>
          </Modal.Footer>
        </Modal>
    );

}

export default NotificationModal
import { React, useEffect } from "react";
import {Modal, Button} from "react-bootstrap";


function NotificationModal({show, setShow, notification, operationOnClosingModal, onDelete}) {

    const handleClose = () => {
        setShow(false)
        operationOnClosingModal(false)
    } 

    function handleNotRead() {
        operationOnClosingModal(true)
        //APIMarkAsNotRead
        setShow(false)
    }

    function handleDelete() {
        onDelete();
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
            <p> <b>Stato:</b> {notification.state.replace(/_/, ' ')} </p>
            <p> <b>Data:</b> {notification.date.split('T')[0]} </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            {!notification.checked && ( <Button variant="primary" onClick={handleNotRead}>Mantieni come non letta</Button> )}
            <Button variant="danger" onClick={handleDelete}>Elimina</Button>
          </Modal.Footer>
        </Modal>
    );

}

export default NotificationModal
import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

import { checkNotification, deleteNotification } from "../utility/apiLibrary";
import NotificationModal from "./NotificationModal";

import "../style/NotificationItem.css"

function NotificationItem({ notification, updatePage }) {

    const [showModal, setShowModal] = useState(false)

    async function handleShowModal() {
        setShowModal(true)
        //updatePage()
    }

    async function handleCloseModal( keepAsNotRead ) {
        if(!keepAsNotRead && !notification.checked)
        {
            const { status } = await checkNotification(notification._id)
            if (status === 200) {
                //window.location.reload(false)
                updatePage() //TODO, modificare
            }
        }
    }

    async function handleDeleteNotification() {
        const { status } = await deleteNotification(notification._id)
        console.log(status)
        if (status === 200) {
            //window.location.reload(false)
            updatePage() //TODO, modificare
        }
    }

    return (
        <>
            <ListGroup.Item action onClick={handleShowModal} key={notification._id} className="ps-3 pe-2">
                {!notification.checked && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                        className="bi bi-envelope-fill me-2 text-primary" viewBox="0 0 16 16">
                        <path
                            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                )}

                {notification.checked && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-envelope-open me-2 " viewBox="0 0 16 16">
                        <path
                            d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z" />
                    </svg>
                )}

                <span classname="main-text">Noleggio: {notification.rent}</span>
                <br />
                <small className="secondary-text">{notification.date.split('T')[0]}</small>
            </ListGroup.Item>
            <NotificationModal show={showModal} setShow={setShowModal} notification={notification} operationOnClosingModal={handleCloseModal} onDelete={handleDeleteNotification} />
        </>
    )
}

export default NotificationItem

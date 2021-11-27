import React, { useEffect, useState } from "react";
import {Container, ListGroup, Spinner} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { checkNotification, getNotifications, getUser } from "../utility/apiLibrary";

import "../style/ProductPage.css"
import "react-datepicker/dist/react-datepicker.css";

const NotificationPage = () => {

    const [notifications, setNotifications] = useState([])
    const [notificationNumber, setNotificationNumber] = useState(0)
    const [isPending, setIsPending] = useState(true);

    const history = useHistory();

    useEffect(() => {
        const fetchNotifications = async () =>{
            const {status, body} = await getNotifications(await getUser())
            if(status === 200){
                setNotificationNumber(body.length);
                setNotifications(body)
                setIsPending(false)
            }
        }
        fetchNotifications()
    }, [])

    async function deleteNotification(id){
        const {status} = await checkNotification(id)
        if(status === 200){
            window.location.reload(false)
        }
    }


    return (
        <Container className="">
            <h2 className="title">Centro notifiche</h2>
            {notificationNumber>1 && (
                <h3>Hai {notificationNumber} notifche da leggere</h3>
            )}
            {notificationNumber===1 && (
                <h3>Hai {notificationNumber} notifca da leggere</h3>
            )}
            {notificationNumber===0 && (
                <h3>Nessuna nuova notifica</h3>
            )}
            {isPending &&
            (<Container>
                    <Spinner animation="border" size="m" />
                </Container>)
            }
            {!isPending && notifications.length >0 &&
                (<ListGroup className="my-2">
                        {notifications.map((notification) => {
                            console.log(notification);
                            return (<ListGroup.Item key={ notification._id } > {notification.rent} </ListGroup.Item>);})}
                    </ListGroup>)
            }
            { !isPending && notifications.length <= 0 &&
                (<h3 className="sub-title">Nessuna notifica</h3>)
            }
        </Container>

    );
}

export default NotificationPage;
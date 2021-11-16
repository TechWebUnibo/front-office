import React, { useEffect, useState } from "react";
import {Container, ListGroup, Spinner} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "../style/ProductPage.css"
import "react-datepicker/dist/react-datepicker.css";
import { checkNotification, getNotifications, getUser } from "../utility/apiLibrary";

const NotificationPage = () => {

    const [notifications, setNotifications] = useState([])
    const [isPending, setIsPending] = useState(true);

    const history = useHistory();

    useEffect(() => {
        const fetchNotifications = async () =>{
            const {status, body} = await getNotifications(await getUser())
            if(status === 200){
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
            <h2>Centro notifiche</h2>
            {isPending &&
            (<Container>
                    <Spinner animation="border" size="m" />
                </Container>)
            }
            {!isPending && notifications.length >0 &&
                (<ListGroup>
                        {notifications.map((n) => {
                     return (<ListGroup.Item> {n.rent} </ListGroup.Item>);})}
                    </ListGroup>)
            }
            { !isPending && notifications.length <= 0 &&
                (<h3>Nessuna notifica</h3>)
            }
        </Container>

    );
}

export default NotificationPage;
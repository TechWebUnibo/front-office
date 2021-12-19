import React, { useEffect, useState } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
import { getNotifications, getUser } from "../utility/apiLibrary";
import Paginator from "../components/Paginator"


import "../style/ProductPage.css"
import "react-datepicker/dist/react-datepicker.css";

import NotificationItem from "../components/NotificationItem";
import seo from "../utility/dynamicPageTitle";

const NotificationPage = () => {

    //Dynamic page title
    seo({title : 'Notifiche | Cater', metaDescription : 'Le tue notifiche'})

    const [notifications, setNotifications] = useState([])
    const [notificationNumber, setNotificationNumber] = useState(0)
    const [isPending, setIsPending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationsPerPage] = useState(5);
    
    async function fetchNotifications() {
        const { status, body } = await getNotifications(await getUser())
        if (status === 200) {
            setNotificationNumber(body.length);
            setNotifications(body)
            setIsPending(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    async function deleteNotification(id) {
        const { status } = await deleteNotification(id)
        if (status === 200) {
            window.location.reload(false)
        }
    }

    // Get current posts
    const indexOfLastPost = currentPage * notificationsPerPage;
    const indexOfFirstPost = indexOfLastPost - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Container className="containerSM">
            <h2 className="title">Centro notifiche</h2>
            {notificationNumber > 1 && (
                <h3 className="sub-title">Hai {notificationNumber} notifche da leggere</h3>
            )}
            {notificationNumber === 1 && (
                <h3 className="sub-title">Hai {notificationNumber} notifca da leggere</h3>
            )}
            {notificationNumber === 0 && (
                <h3 className="sub-title">Nessuna nuova notifica</h3>
            )}
            {isPending &&
                (<Container>
                    <Spinner animation="border" size="m" />
                </Container>)
            }
            {!isPending && notifications.length > 0 &&
                (<ListGroup className="my-2">
                    {currentNotifications.map((notification) => {
                            return (<NotificationItem notification={notification} updatePage={fetchNotifications}/>);})}
                    </ListGroup>)
            }
            {!isPending && notifications.length <= 0 &&
                (<h3 className="sub-title">Nessuna notifica</h3>)
            }
            <Paginator className="text-center"
                postsPerPage={notificationsPerPage}
                totalPosts={notifications.length}
                paginate={paginate}
            />
        </Container>

    );
}

export default NotificationPage;
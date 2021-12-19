import { Row, Col, Card, Container, Spinner, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCustomer, getUser } from '../utility/apiLibrary'

import seo from '../utility/dynamicPageTitle'

const Dashboard = () => {

    //Dynamic page title
    seo({ title: 'Profilo | Cater', metaDescription: 'Il tuo profilo' })

    const [customer, setCustomer] = useState({})
    const [isPending, setIsPending] = useState(true);

    const cards = [
        {
            title: 'Informazioni personali',
            text: 'Visualizza e modifica il tuo account',
            link: '/profile',
            img: '/img/cardProfile.png'
        },
        {
            title: 'I tuoi noleggi',
            text: 'Visualizza e modifica i tuoi noleggi',
            link: '/rentals',
            img: '/img/cardOrders.png'
        },
        {
            title: 'Le tue notifiche',
            text: 'Visualizza le tue notifiche',
            link: '/notifications',
            img: '/img/notification.png'
        },
        {
            title: 'Le tue fatture',
            text: 'Visualizza le tue fatture',
            link: '/invoices',
            img: '/img/invoice.png'
        }
    ]

    useEffect(() => {
        setIsPending(true)
        const loadProfile = async function () {
            let res = await getCustomer(await getUser())
            if (res) {
                if (res.avatar) {
                    cards[0].img = res.avatar
                }
                setCustomer(res)
            }
            setIsPending(false)
        }
        loadProfile()
    }, [])

    cards[0].img = customer.avatar !== '' ? customer.avatar : '/img/cardProfile.png'

    return (
        <>
            {isPending && (
                <Container>
                    <Spinner animation="border" size="m" />
                </Container>
            )}
            {!isPending && (
                <Container>
                    <h2 className="title">Welcome {customer.username}</h2>
                    <Row xs={1} md={2} className="g-4 my-2">
                        {cards.map((card) => (
                            <Col key={card.title}>
                                <Link to={card.link}>
                                    <Card>
                                        <Card.Body>
                                            <Row>
                                                <Col xs={4} className="align-self-center">
                                                <Image fluid alt='Avatar del profilo' src={card.img} className={card.link === '/profile' ? 'roundedCircle' : ''} />
                                                </Col>
                                                <Col xs={8}>

                                                    <Card.Title>{card.title}</Card.Title>
                                                    <Card.Text>
                                                        {card.text}
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </>
    )
}

export default Dashboard
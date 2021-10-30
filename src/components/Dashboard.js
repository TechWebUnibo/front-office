import { Row, Col, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCustomer, getUser } from '../utility/apiLibrary'

const Dashboard = () =>{

    const [customer, setCustomer] = useState({})
    
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
            link: '/messages',
            img: '/img/notification.png'
        },
    ]

    useEffect(() => {
        const loadProfile = async function () {
            let res = await getCustomer(await getUser())
            if(res){
                setCustomer(res)
            }
        }
        loadProfile() 
    }, [])

    return(
        <Container>
            <h2>Welcome {customer.username}</h2>
            <Row xs={1} md={2} className="g-4 my-2">
                {cards.map((card) => (
                    <Col key={card.title}>
                        <Link to={card.link}>
                            <Card>
                            <Card.Body>
                                <Row>
                                    <Col xs={4} className="align-self-center">
                                        <Card.Img variant="top" src={card.img} />
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
        
    )
}

export default Dashboard
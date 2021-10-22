import {Row, Col, Form, Button, Container, Image } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getCustomer, getUser } from '../utility/apiLibrary'


const Profile = () => {

    const [customer, setCustomer] = useState({})
    const genericAvatar = '/img/cardProfile.png'

    useEffect(() => {
        const loadProfile = async function () {
            let res = await getCustomer(await getUser())
            if (res) {
                setCustomer(res)
            }
        }
        loadProfile()
    }, [customer])

    return (
        <Container>
            <h2 className="display-2">
                Profilo
                </h2>
            <Form>
                <Form.Group as={Row} className="mb-3 align-content-center" controlId="username">
                    <Form.Label column sm={2} className="align-self-center">
                        Avatar
                    </Form.Label>
                    <Col sm={2}>
                    <Image fluid src={customer.img ? customer.img : genericAvatar} roundedCircle />
                    </Col>
                    <Col sm={8} className='align-self-center'>
                        <Form.Control
                            type="file"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="username">
                    <Form.Label column sm={2}>
                        Username
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" value={customer.username} placeholder="Username"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="name" >
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" value={customer.name} placeholder="Name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="surname">
                    <Form.Label column sm={2}>
                        Surname
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" value={customer.surname} placeholder="Surname"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="password">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Aggiorna profilo</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Profile
